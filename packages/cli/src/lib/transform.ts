export interface TransformOptions
{
	from: string;
	to: string;
}

export function rewriteImports(source: string, _options: TransformOptions): string
{
	return source;
}
