#!/usr/bin/env node
import { runSkill } from './commands/skill.js';
import { runInit } from './commands/init.js';
import { runAdd } from './commands/add.js';
import { Command } from 'commander';

const program = new Command();

program
	.name('dafink-ui')
	.description('Add DaFink UI components to your project')
	.version('0.1.0');

program
	.command('init')
	.description('Interactive setup wizard — writes dafink.config.json and token CSS')
	.action(async () =>
	{
		await runInit(process.cwd());
	});

program
	.command('add [components...]')
	.description('Copy component files into your project')
	.option('--all', 'Copy every component')
	.action(async (components: string[], options: { all?: boolean }) =>
	{
		await runAdd(components, options, process.cwd());
	});

program
	.command('skill [path]')
	.description('Download the dafink-ui.skill design skill file')
	.action(async (path: string | undefined) =>
	{
		await runSkill(path, process.cwd());
	});

program.parse();
