import { CodeBlock } from '@/src/components/CodeBlock/CodeBlock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'MCP Server',
	description: 'Connect Obi UI to Claude or any MCP-compatible AI. The server exposes every component spec, token definition, and design pattern as a live resource.',
};

const MCP_URL = 'https://ui.ryangarfinkel.dev/api/mcp';

const CLAUDE_DESKTOP_CONFIG = `{
  "mcpServers": {
    "obi-ui": {
      "type": "http",
      "url": "${MCP_URL}"
    }
  }
}`;

const CLAUDE_CODE_CONFIG = `{
  "mcpServers": {
    "obi-ui": {
      "type": "http",
      "url": "${MCP_URL}"
    }
  }
}`;

const McpPage = () =>
{
  return (
    <div className='flex flex-col gap-12'>

      {/* Header */}
      <section className='flex flex-col gap-3'>
        <h1 className='text-3xl font-semibold tracking-tight text-text'>
          MCP Server
        </h1>
        <p className='text-base text-text-muted leading-relaxed max-w-2xl'>
          Obi UI ships a built-in{' '}
          <a
            href='https://modelcontextprotocol.io'
            target='_blank'
            rel='noopener noreferrer'
            className='text-text underline underline-offset-4 hover:text-text-muted transition-colors'
          >
            Model Context Protocol
          </a>{' '}
          server hosted at{' '}
          <code className='font-mono text-xs'>/api/mcp</code>. Connect it to
          Claude or any MCP-compatible AI tool and it will have live access to
          every component spec, design token, and pattern — so it uses the
          actual Obi UI API instead of guessing.
        </p>
      </section>

      {/* What it exposes */}
      <section className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold text-text'>What the server exposes</h2>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          <div className='rounded-lg border border-surface-border bg-surface p-4 flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <span className='text-xs font-mono font-medium text-brand bg-brand/10 px-2 py-0.5 rounded'>resource</span>
              <code className='text-sm font-mono text-text'>obi://components</code>
            </div>
            <p className='text-sm text-text-muted leading-relaxed'>
              The full component registry — every slug, name, category,
              description, props, and dependency list.
            </p>
          </div>

          <div className='rounded-lg border border-surface-border bg-surface p-4 flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <span className='text-xs font-mono font-medium text-brand bg-brand/10 px-2 py-0.5 rounded'>resource</span>
              <code className='text-sm font-mono text-text'>obi://tokens</code>
            </div>
            <p className='text-sm text-text-muted leading-relaxed'>
              Every design token — colors, spacing, motion, typography — as a
              structured JSON object.
            </p>
          </div>

          <div className='rounded-lg border border-surface-border bg-surface p-4 flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <span className='text-xs font-mono font-medium text-brand bg-brand/10 px-2 py-0.5 rounded'>resource</span>
              <code className='text-sm font-mono text-text'>obi://patterns</code>
            </div>
            <p className='text-sm text-text-muted leading-relaxed'>
              The list of design pattern documents: accessibility guidelines,
              interactive state rules, and the visual design philosophy.
            </p>
          </div>

          <div className='rounded-lg border border-surface-border bg-surface p-4 flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <span className='text-xs font-mono font-medium text-text-muted bg-surface-active px-2 py-0.5 rounded'>tool</span>
              <code className='text-sm font-mono text-text'>get_component_spec</code>
            </div>
            <p className='text-sm text-text-muted leading-relaxed'>
              Returns the full <code className='font-mono text-xs'>spec.md</code> for a
              named component — props, variants, accessibility notes, and usage
              guidance.
            </p>
          </div>

          <div className='rounded-lg border border-surface-border bg-surface p-4 flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <span className='text-xs font-mono font-medium text-text-muted bg-surface-active px-2 py-0.5 rounded'>tool</span>
              <code className='text-sm font-mono text-text'>get_pattern</code>
            </div>
            <p className='text-sm text-text-muted leading-relaxed'>
              Returns a named pattern document by slug — e.g.{' '}
              <code className='font-mono text-xs'>&quot;accessibility&quot;</code> or{' '}
              <code className='font-mono text-xs'>&quot;design&quot;</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className='flex flex-col gap-6'>
        <h2 className='text-xl font-semibold text-text'>Connecting to Claude</h2>

        <div className='flex flex-col gap-2'>
          <p className='text-sm font-medium text-text'>Claude Desktop</p>
          <p className='text-sm text-text-muted leading-relaxed'>
            Add an entry to your{' '}
            <code className='font-mono text-xs'>claude_desktop_config.json</code>.
            On macOS this file lives at{' '}
            <code className='font-mono text-xs'>
              ~/Library/Application Support/Claude/claude_desktop_config.json
            </code>
            .
          </p>
          <CodeBlock code={CLAUDE_DESKTOP_CONFIG} />
        </div>

        <div className='flex flex-col gap-2'>
          <p className='text-sm font-medium text-text'>Claude Code</p>
          <p className='text-sm text-text-muted leading-relaxed'>
            Add the same entry to your{' '}
            <code className='font-mono text-xs'>.claude/settings.json</code> (project-level)
            or <code className='font-mono text-xs'>~/.claude/settings.json</code> (global).
          </p>
          <CodeBlock code={CLAUDE_CODE_CONFIG} />
        </div>
      </section>

      {/* Other clients */}
      <section className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold text-text'>Other MCP clients</h2>
        <p className='text-sm text-text-muted leading-relaxed'>
          Any client that supports the MCP Streamable HTTP transport can connect
          directly to{' '}
          <code className='font-mono text-xs'>{MCP_URL}</code>.
          This includes Cursor, Windsurf, and any other tool that supports remote
          MCP servers.
        </p>
      </section>

      {/* How it helps */}
      <section className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold text-text'>How it changes your workflow</h2>
        <p className='text-sm text-text-muted leading-relaxed'>
          Without the MCP server, asking an AI to &quot;build a form using Obi
          UI&quot; is a gamble — it may hallucinate prop names, invent variants that
          don&apos;t exist, or use an old API it saw in training data.
        </p>
        <p className='text-sm text-text-muted leading-relaxed'>
          With the server connected, Claude can call{' '}
          <code className='font-mono text-xs'>get_component_spec(&quot;Form&quot;)</code> before
          writing any code. It gets the exact prop table, the correct import
          path, the variants that actually exist, and the accessibility guidance
          for that component. The result is code that works the first time.
        </p>
        <p className='text-sm text-text-muted leading-relaxed'>
          The server also exposes the full accessibility and design pattern
          documents, so Claude understands the visual philosophy, token
          naming conventions, and overlay interaction rules — not just individual
          component APIs.
        </p>
      </section>

      {/* Spec format */}
      <section className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold text-text'>Keeping specs current</h2>
        <p className='text-sm text-text-muted leading-relaxed'>
          Each component has a <code className='font-mono text-xs'>spec.md</code> file
          alongside its source code. The MCP server reads these files at request
          time — there is no cache to invalidate. When you update a component
          and update its spec, the server immediately returns the new information.
        </p>
        <p className='text-sm text-text-muted leading-relaxed'>
          The spec format is documented in{' '}
          <code className='font-mono text-xs'>rules/new-component.md</code>. Every
          spec must include: a one-line description, a props table, an
          interactive states section, accessibility notes, and the install
          command.
        </p>
      </section>

    </div>
  );
};

export default McpPage;
