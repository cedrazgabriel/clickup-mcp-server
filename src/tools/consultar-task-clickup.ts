import { z } from "zod";
import { server } from "../server";
import { MakeClickUpTaskUseCase } from "../factories/make-get-clickup-task";

export function registerConsultarTaskClickUp() {
  server.tool("Consultar task ClickUp",
    "Consultar detalhes de uma task no ClickUp pelo ID",
    {
      taskId: z.string().describe("ID da tarefa no ClickUp"),
    },
    async ({ taskId }) => {
      
      try {
        const usecase = await MakeClickUpTaskUseCase();
        
        const task = await usecase.execute(taskId);
        
        // Formatação da descrição para ser mais amigável
        const formattedDescription = task.description
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]*>/g, '');
        
        return {
          content: [{ 
            type: "text" as const, 
            text: JSON.stringify({
              success: true,
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
              error: `Erro ao consultar task: ${error instanceof Error ? error.message : String(error)}`
            }, null, 2)
          }],
        };
      }
    }
  );
} 

