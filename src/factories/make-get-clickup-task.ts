import { GetClickUpTaskUseCase } from "../use-cases/get-clickup-task.js";
import { ClickUpClient } from "../tools/clickup-client.js";

export async function MakeClickUpTaskUseCase() {
  const apiKey = process.env.CLICKUP_API_KEY as string;
  const clickUpClient = new ClickUpClient(apiKey);
  const getClickUpTaskUseCase = new GetClickUpTaskUseCase(clickUpClient);
  return getClickUpTaskUseCase;
}
