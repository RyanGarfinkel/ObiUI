import fs from 'fs';
import path from 'path';

const COMPONENTS_DIR = path.resolve(__dirname, '../../src/components');

export function listComponents(): string[]
{
	return fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
		.filter(d => d.isDirectory())
		.map(d => d.name);
}

export function getComponentSpec(name: string): string
{
	const specPath = path.join(COMPONENTS_DIR, name, 'spec.md');
	if(!fs.existsSync(specPath))
		throw new Error(`No spec found for component: ${name}`);
	return fs.readFileSync(specPath, 'utf-8');
}
