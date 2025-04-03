import { registerConsultarTaskClickUp } from "./consultar-task-clickup";
import { registerAtualizarStatusTaskClickUp } from "./atualizar-status-task-clickup";
import { server, startServer } from "../server";

export function registerAllTools() {
  registerConsultarTaskClickUp();
  registerAtualizarStatusTaskClickUp();
}

export { server, startServer };
export * from './clickup-client.js'; 