import { ClickUpClient } from '../tools/clickup-client.js';
import { ErrorHandler } from '../utils/error-handler.js';
import { TaskEntity } from '../entities/task.entity.js';
import { TaskMapper } from '../mappers/task.mapper.js';

export class GetClickUpTaskUseCase {
  constructor(private readonly clickUpClient: ClickUpClient) {}

  async execute(taskId: string, useCustomTaskId: boolean = true): Promise<TaskEntity> {
    try {
      const teamId = process.env.TEAM_ID;
      
      const response = await this.clickUpClient.getTask(taskId, useCustomTaskId, teamId);
        
      return TaskMapper.toEntity(response.data);
    } catch (error: unknown) {
      return ErrorHandler.handleClickUpError(error, taskId);
    }
  }
} 