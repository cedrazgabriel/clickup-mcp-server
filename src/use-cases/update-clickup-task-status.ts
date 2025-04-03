import { ClickUpClient } from '../tools/clickup-client.js';
import { ErrorHandler } from '../utils/error-handler.js';
import { TaskEntity } from '../entities/task.entity.js';
import { TaskMapper } from '../mappers/task.mapper.js';

export class UpdateClickUpTaskStatusUseCase {
  constructor(private readonly clickUpClient: ClickUpClient) {}

  async execute(
    taskId: string,
    newStatus: string,
    useCustomTaskId: boolean = true
  ): Promise<TaskEntity> {
    try {
      const teamId = process.env.TEAM_ID;
      
      console.log(`[ClickUp] Atualizando status da task ${taskId} para "${newStatus}"`);
      
      // Atualiza o status da tarefa
      await this.clickUpClient.updateTaskStatus(
        taskId,
        newStatus,
        useCustomTaskId,
        teamId
      );

      // Recupera a tarefa atualizada
      const response = await this.clickUpClient.getTask(
        taskId,
        useCustomTaskId,
        teamId
      );

      console.log(`[ClickUp] Status da task atualizado com sucesso para "${newStatus}"`);
      
      return TaskMapper.toEntity(response.data);
    } catch (error: unknown) {
      return ErrorHandler.handleClickUpError(error, taskId, newStatus);
    }
  }
} 