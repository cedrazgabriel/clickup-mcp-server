import { AxiosError } from 'axios';
import { ClickUpTask } from '../types/clickup/clickup-task.js';
import { ClickUpClient } from '../tools/clickup-client.js';

export class GetClickUpTaskUseCase {
  constructor(private readonly clickUpClient: ClickUpClient) {}

  async execute(taskId: string, useCustomTaskId: boolean = true): Promise<ClickUpTask> {
    try {
      const teamId = process.env.TEAM_ID;
      
      const response = await this.clickUpClient.getTask(taskId, useCustomTaskId, teamId);

      console.log(`[ClickUp] Task encontrada: ${response.data.name}`);
      
      return {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
        status: {
          status: response.data.status.status,
          color: response.data.status.color
        },
        assignees: response.data.assignees.map((assignee: any) => ({
          id: assignee.id,
          username: assignee.username,
          email: assignee.email,
          profilePicture: assignee.profilePicture
        })),
        tags: response.data.tags.map((tag: any) => tag.name),
        dueDate: response.data.due_date ? new Date(parseInt(response.data.due_date)).toISOString() : null,
        timeEstimate: response.data.time_estimate,
        createdDate: new Date(parseInt(response.data.date_created)).toISOString(),
        updatedDate: new Date(parseInt(response.data.date_updated)).toISOString()
      };
    } catch (error: unknown) {
      console.error('[ClickUp] Erro ao consultar task:', error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new Error(`Task com ID ${taskId} não encontrada no ClickUp.`);
        } else if (error.response?.status === 401 || error.response?.status === 403) {
          throw new Error('Erro de autenticação com a API do ClickUp. Verifique sua chave API.');
        } else {
          throw new Error(`Erro ao consultar a API do ClickUp: ${(error.response?.data as any)?.err || error.message}`);
        }
      }
      throw new Error(`Erro ao consultar task do ClickUp: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
} 