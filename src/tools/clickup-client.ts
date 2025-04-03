import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ClickUpTaskResponse, ClickUpErrorResponse } from '../types/clickup/responses/index.js';
import { ClickUpUpdateTaskRequest } from '../types/clickup/requests/index.js';

export class ClickUpClient {
  private readonly client: AxiosInstance;

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: 'https://api.clickup.com/api/v2/task',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      }
    });
  }

  async getTask(taskId: string, useCustomTaskId: boolean = false, teamId?: string): Promise<AxiosResponse<ClickUpTaskResponse>> {
    let url = `/${taskId}`;
    if (useCustomTaskId && teamId) {
      url = `/${taskId}?custom_task_ids=true&team_id=${teamId}`;
    }
    
    return this.client.get<ClickUpTaskResponse>(url);
  }

  async updateTaskStatus(taskId: string, statusName: string, useCustomTaskId: boolean = false, teamId?: string): Promise<AxiosResponse<ClickUpTaskResponse>> {
    let url = `/${taskId}`;
    if (useCustomTaskId && teamId) {
      url = `/${taskId}?custom_task_ids=true&team_id=${teamId}`;
    }
    
    return this.client.put<ClickUpTaskResponse>(url, {
      status: statusName
    });
  }
  
  async updateTask(
    taskId: string,
    updateData: ClickUpUpdateTaskRequest,
    useCustomTaskId: boolean = false,
    teamId?: string
  ): Promise<AxiosResponse<ClickUpTaskResponse>> {
    let url = `/${taskId}`;
    if (useCustomTaskId && teamId) {
      url = `/${taskId}?custom_task_ids=true&team_id=${teamId}`;
    }
    
    return this.client.put<ClickUpTaskResponse>(url, updateData);
  }

  getAxiosClient(): AxiosInstance {
    return this.client;
  }
} 