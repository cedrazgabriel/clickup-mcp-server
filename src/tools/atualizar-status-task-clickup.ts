import { z } from "zod";
import { server } from "../server";
import { MakeUpdateClickUpTaskStatusUseCase } from "../factories/make-update-clickup-task-status";

export function registerAtualizarStatusTaskClickUp() {
  server.tool("Atualizar status da task ClickUp",
    "Atualiza o status de uma task no ClickUp",
    {
      taskId: z.string().describe("ID da tarefa no ClickUp"),
      novoStatus: z.string().describe("Novo status da tarefa (ex: 'todo', 'em desenvolvimento', 'em teste')"),
    },
    async ({ taskId, novoStatus }) => {
      
      try {
        const usecase = await MakeUpdateClickUpTaskStatusUseCase();
        
        const task = await usecase.execute(taskId, novoStatus);
        
        // Formatação da descrição para ser mais amigável
        const formattedDescription = task.description
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]*>/g, '');
        
        return {
          content: [{ 
            type: "text" as const, 
            text: JSON.stringify({
              success: true,
              message: `Status da task ${taskId} atualizado para "${novoStatus}"`,
              task: {
                ...task,
                description: formattedDescription
              }
            }, null, 2)
          }],
        };
      } catch (error) {
        return {
          content: [{ 
            type: "text" as const, 
            text: JSON.stringify({
              success: false,
              error: `Erro ao atualizar status da task: ${error instanceof Error ? error.message : String(error)}`
            }, null, 2)
          }],
        };
      }
    }
  );
} 