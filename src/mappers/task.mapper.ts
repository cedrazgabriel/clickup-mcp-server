import { TaskEntity } from '../entities/task.entity.js';
import { ClickUpTaskResponse } from '../types/clickup/responses/clickup-task-response.js';

export class TaskMapper {
  /**
   * Converte uma resposta da API do ClickUp para entidade de Task do nosso sistema
   */
  static toEntity(response: ClickUpTaskResponse): TaskEntity {
    // Extrair campos personalizados em um formato mais amigável
    const customFields: Record<string, any> = {};
    
    if (response.custom_fields && response.custom_fields.length > 0) {
      response.custom_fields.forEach(field => {
        if (field.value !== undefined) {
          customFields[field.name] = field.value;
        }
      });
    }

    return {
      id: response.id,
      customId: response.custom_id,
      name: response.name,
      description: response.description,
      status: {
        id: response.status.id,
        name: response.status.status,
        color: response.status.color
      },
      createdAt: new Date(parseInt(response.date_created)),
      updatedAt: new Date(parseInt(response.date_updated)),
      isArchived: response.archived,
      creator: {
        id: response.creator.id,
        name: response.creator.username,
        email: response.creator.email,
        profileImage: response.creator.profilePicture
      },
      assignees: response.assignees.map(assignee => ({
        id: assignee.id,
        name: assignee.username,
        email: assignee.email,
        profileImage: assignee.profilePicture
      })),
      tags: Array.isArray(response.tags) ? response.tags : [],
      dueDate: response.due_date ? new Date(parseInt(response.due_date)) : null,
      timeEstimate: response.time_estimate,
      timeSpent: response.time_spent,
      parentTaskId: response.parent || null,
      url: response.url,
      customFields
    };
  }
  
  /**
   * Converte múltiplas respostas da API do ClickUp para entidades de Task
   */
  static toEntities(responses: ClickUpTaskResponse[]): TaskEntity[] {
    return responses.map(response => this.toEntity(response));
  }
} 