/**
 * GCP MCP Server Template
 * 
 * Provides an MCP Server endpoint for querying AlloyDB / PostgreSQL using bundled tools.
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bundleDir = path.join(__dirname, 'bundle');
const psqlPath = path.join(bundleDir, 'bin', 'psql.exe');

const server = new Server(
    {
        name: 'gcp-alloydb-mcp-server',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'execute_alloydb_query',
                description: 'Execute SQL queries against AlloyDB / Cloud SQL via bundled psql client',
                inputSchema: {
                    type: 'object',
                    properties: {
                        query: { type: 'string', description: 'SQL query to execute' },
                        host: { type: 'string', description: 'DB host (default: 127.0.0.1)', default: '127.0.0.1' },
                        port: { type: 'number', description: 'DB port (default: 5432)', default: 5432 },
                        user: { type: 'string', description: 'DB user', default: 'postgres' },
                        dbname: { type: 'string', description: 'Database name', default: 'postgres' }
                    },
                    required: ['query']
                }
            }
        ]
    };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === 'execute_alloydb_query') {
        const { query, host = '127.0.0.1', port = 5432, user = 'postgres', dbname = 'postgres' } = request.params.arguments || {};
        try {
            const cmd = `"${psqlPath}" -h ${host} -p ${port} -U ${user} -d ${dbname} -c "${query}"`;
            const output = execSync(cmd, { encoding: 'utf8' });
            return {
                content: [{ type: 'text', text: output }]
            };
        } catch (error) {
            return {
                content: [{ type: 'text', text: `Query execution error: ${error.message}` }],
                isError: true
            };
        }
    }
    throw new Error(`Tool not found: ${request.params.name}`);
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('GCP AlloyDB MCP Server running on stdio');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main().catch((err) => {
        console.error('Fatal MCP Server error:', err);
        process.exit(1);
    });
}

export { server };
