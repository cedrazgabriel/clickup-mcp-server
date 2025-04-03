import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create server instance
export const server = new McpServer({
  name: "ClickUp Helper",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

export async function startServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
} 