import { UpdateClickUpTaskStatusUseCase } from "../use-cases/update-clickup-task-status.js";
import { ClickUpClient } from "../tools/clickup-client.js";

export async function MakeUpdateClickUpTaskStatusUseCase() {
  const apiKey = process.env.CLICKUP_API_KEY as string;
  const clickUpClient = new ClickUpClient(apiKey);
  const updateClickUpTaskStatusUseCase = new UpdateClickUpTaskStatusUseCase(clickUpClient);
  return updateClickUpTaskStatusUseCase;
} 