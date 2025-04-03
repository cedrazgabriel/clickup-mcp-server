import dotenv from 'dotenv';
import { z } from 'zod';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Define o esquema de validação para as variáveis de ambiente
const envSchema = z.object({
  CLICKUP_API_KEY: z.string().min(1, 'CLICKUP_API_KEY é obrigatório'),
  TEAM_ID: z.string().min(1, 'TEAM_ID é obrigatório'),
});

// Tipo das variáveis de ambiente baseado no esquema
type Env = z.infer<typeof envSchema>;

/**
 * Verifica se todas as variáveis de ambiente necessárias estão definidas
 * @returns Objeto com as variáveis de ambiente tipadas
 * @throws Error se alguma variável de ambiente estiver faltando ou for inválida
 */
export function verificarVariaveisAmbiente(): Env {
  try {
    // Tenta validar o objeto process.env
    return envSchema.parse(process.env);
  } catch (error) {
    // Captura erros de validação do Zod
    if (error instanceof z.ZodError) {
      const mensagensErro = error.errors.map(err => `${err.path}: ${err.message}`).join(', ');
      throw new Error(`Variáveis de ambiente inválidas: ${mensagensErro}. Verifique seu arquivo .env`);
    }
    throw error;
  }
}