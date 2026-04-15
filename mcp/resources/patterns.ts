import fs from 'fs';
import path from 'path';

const PATTERNS_DIR = path.resolve(__dirname, '../../src/patterns');

export function listPatterns(): string[]
{
	return fs.readdirSync(PATTERNS_DIR)
		.filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
		.map(f => f.replace(/\.mdx?$/, ''));
}

export function getPattern(name: string): string
{
	const candidates = [
		path.join(PATTERNS_DIR, `${name}.mdx`),
		path.join(PATTERNS_DIR, `${name}.md`),
	];

	for(const p of candidates)
	{
		if(fs.existsSync(p))
			return fs.readFileSync(p, 'utf-8');
	}

	throw new Error(`No pattern found: ${name}`);
}
