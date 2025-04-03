import { ClickUpTask } from '../types/clickup/clickup-task.js';

export class ClickUpTaskMapper {
  static toEntity(data: any): ClickUpTask {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      status: {
        status: data.status.status,
        color: data.status.color
      },
      assignees: data.assignees.map((assignee: any) => ({
        id: assignee.id,
        username: assignee.username,
        email: assignee.email,
        profilePicture: assignee.profilePicture
      })),
      tags: data.tags.map((tag: any) => tag.name),
      dueDate: data.due_date ? new Date(parseInt(data.due_date)).toISOString() : null,
      timeEstimate: data.time_estimate,
      createdDate: new Date(parseInt(data.date_created)).toISOString(),
      updatedDate: new Date(parseInt(data.date_updated)).toISOString()
    };
  }
} 