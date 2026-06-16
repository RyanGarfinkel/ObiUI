import { REGISTRY, resolve as resolveEntry } from '../lib/registry.js';
import { mkdirSync, copyFileSync, existsSync } from 'fs';
import type { RegistryEntry } from '../lib/registry.js';
import { resolve, dirname, basename } from 'path';
import { spinner, log } from '@clack/prompts';
import { readConfig } from '../lib/config.js';
import { execSync } from 'child_process';
import pc from 'picocolors';

function detectPackageManager(cwd: string): 'pnpm' | 'yarn' | 'npm'
{
	if(existsSync(resolve(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
	if(existsSync(resolve(cwd, 'yarn.lock'))) return 'yarn';
	return 'npm';
}

function installCmd(pm: 'pnpm' | 'yarn' | 'npm', deps: string[]): string
{
	const pkgs = deps.join(' ');
	if(pm === 'pnpm') return `pnpm add ${pkgs}`;
	if(pm === 'yarn') return `yarn add ${pkgs}`;
	return `npm install ${pkgs}`;
}

function copyComponent(entry: RegistryEntry, registryDir: URL, targetDir: string): void
{
	for(const file of entry.files)
	{
		const srcPath = new URL(file, registryDir).pathname;
		const destPath = resolve(targetDir, file);

		mkdirSync(dirname(destPath), { recursive: true });
		copyFileSync(srcPath, destPath);

		log.info(pc.dim('copied ') + pc.cyan(file) + pc.dim(` → ${destPath}`));
	}
}

export async function runAdd(inputs: string[], options: { all?: boolean }, cwd: string): Promise<void>
{
	const config = readConfig(cwd);
	const targetDir = resolve(cwd, config.componentsDir);
	const pm = detectPackageManager(cwd);

	const registryDir = new URL('../registry/', import.meta.url);

	let entries: RegistryEntry[];

	if(options.all)
	{
		entries = REGISTRY;
	}
	else
	{
		if(inputs.length === 0)
		{
			log.error('Specify component name(s) or use --all');
			process.exit(1);
		}

		entries = [];

		for(const input of inputs)
		{
			const entry = resolveEntry(input);

			if(!entry)
			{
				log.warn(pc.yellow(`Unknown component: ${input}`) + ' — skipping');
				continue;
			}

			entries.push(entry);
		}
	}

	if(entries.length === 0)
	{
		log.error('No valid components to add.');
		process.exit(1);
	}

	const s = spinner();
	s.start(`Copying ${entries.length} component(s)...`);

	const allDeps = new Set<string>();

	for(const entry of entries)
	{
		copyComponent(entry, registryDir, targetDir);
		entry.deps.forEach(d => allDeps.add(d));
	}

	s.stop('Files copied.');

	if(allDeps.size > 0)
	{
		const deps = [...allDeps];
		const cmd = installCmd(pm, deps);

		log.info(`Installing dependencies: ${pc.cyan(cmd)}`);

		execSync(cmd, { cwd, stdio: 'inherit' });

		log.success('Dependencies installed.');
	}

	log.success(
		`Added ${entries.map(e => pc.bold(e.name)).join(', ')} to ${pc.dim(config.componentsDir)}`
	);
}
