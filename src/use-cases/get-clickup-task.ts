import { ClickUpTask } from '../types/clickup/clickup-task.js';
import { ClickUpClient } from '../tools/clickup-client.js';
import { ClickUpTaskMapper } from '../mappers/clickup-task.mapper.js';
import { ErrorHandler } from '../utils/error-handler.js';

export class GetClickUpTaskUseCase {
  constructor(private readonly clickUpClient: ClickUpClient) {}

  async execute(taskId: string, useCustomTaskId: boolean = true): Promise<ClickUpTask> {
    try {
      const teamId = process.env.TEAM_ID;
      
      const response = await this.clickUpClient.getTask(taskId, useCustomTaskId, teamId);
        
      return ClickUpTaskMapper.toEntity(response.data);
    } catch (error: unknown) {
      return ErrorHandler.handleClickUpError(error, taskId);
    }
  }
} 