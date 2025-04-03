import { ClickUpClient } from '../tools/clickup-client.js';
import { ErrorHandler } from '../utils/error-handler.js';
import { TaskEntity } from '../entities/task.entity.js';
import { TaskMapper } from '../mappers/task.mapper.js';
import { ClickUpUpdateTaskRequest } from '../types/clickup/requests/index.js';

export class UpdateClickUpTaskUseCase {
  constructor(private readonly clickUpClient: ClickUpClient) {}

  async execute(
    taskId: string,
    updateData: Partial<TaskEntity>,
    useCustomTaskId: boolean = true
  ): Promise<TaskEntity> {
    try {
      const teamId = process.env.TEAM_ID;
      
      console.log(`[ClickUp] Atualizando task ${taskId}`);
      
      // Converter a entidade do domínio para o formato esperado pela API do ClickUp
      const clickUpUpdateData: ClickUpUpdateTaskRequest = this.mapEntityToRequest(updateData);
      
      // Envia a atualização para a API
      const response = await this.clickUpClient.updateTask(
        taskId,
        clickUpUpdateData,
        useCustomTaskId,
        teamId
      );

      console.log(`[ClickUp] Task atualizada com sucesso: ${response.data.name}`);
      
      // Converte a resposta de volta para a entidade do domínio
      return TaskMapper.toEntity(response.data);
    } catch (error: unknown) {
      return ErrorHandler.handleClickUpError(error, taskId);
    }
  }

  /**
   * Converte os campos da entidade TaskEntity para o formato de requisição ClickUpUpdateTaskRequest
   */
  private mapEntityToRequest(entity: Partial<TaskEntity>): ClickUpUpdateTaskRequest {
    const request: ClickUpUpdateTaskRequest = {};
    
    if (entity.name !== undefined) {
      request.name = entity.name;
    }
    
    if (entity.description !== undefined) {
      request.description = entity.description;
    }
    
    if (entity.status?.name !== undefined) {
      request.status = entity.status.name;
    }
    
    if (entity.dueDate !== undefined) {
      request.due_date = entity.dueDate ? new Date(entity.dueDate).getTime() : null;
    }
    
    if (entity.isArchived !== undefined) {
      request.archived = entity.isArchived;
    }
    
    if (entity.timeEstimate !== undefined) {
      request.time_estimate = entity.timeEstimate;
    }
    
    // Converter campos personalizados se presentes
    if (entity.customFields && Object.keys(entity.customFields).length > 0) {
      request.custom_fields = Object.entries(entity.customFields).map(([name, value]) => {
        // Aqui precisaríamos de um mapeamento de nomes para IDs de campos personalizados
        // Por simplicidade, estamos assumindo que o nome já é o ID do campo
        return {
          id: name,
          value: value
        };
      });
    }
    
    return request;
  }
} 