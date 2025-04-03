import axios, { AxiosInstance } from 'axios';

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

  async getTask(taskId: string, useCustomTaskId: boolean = false, teamId?: string): Promise<any> {
    let url = `/${taskId}`;
    if (useCustomTaskId && teamId) {
      url = `/${taskId}?custom_task_ids=true&team_id=${teamId}`;
    }
    
    return this.client.get(url);
  }

  async updateTaskStatus(taskId: string, statusName: string, useCustomTaskId: boolean = false, teamId?: string): Promise<any> {
    let url = `/${taskId}`;
    if (useCustomTaskId && teamId) {
      url = `/${taskId}?custom_task_ids=true&team_id=${teamId}`;
    }
    
    return this.client.put(url, {
      status: statusName
    });
  }

  getAxiosClient(): AxiosInstance {
    return this.client;
  }
} 