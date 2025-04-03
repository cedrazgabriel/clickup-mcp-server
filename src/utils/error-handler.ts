import { AxiosError } from 'axios';
import createHttpError from 'http-errors';
import { ClickUpErrorResponse } from '../types/clickup/responses/index.js';

export class ErrorHandler {
  static handleClickUpError(error: unknown, resourceId?: string, newStatus?: string): never {
    console.error('[ClickUp] Erro na operação:', error);
    
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const errorData = error.response?.data as ClickUpErrorResponse;
      
      // Mensagem de erro formatada com código do ClickUp, se disponível
      const errorMessage = errorData?.err 
        ? `${errorData.err}${errorData.ECODE ? ` (Código: ${errorData.ECODE})` : ''}`
        : error.message;
      
      if (status === 404) {
        throw createHttpError(404, `Recurso ${resourceId ? `com ID ${resourceId}` : ''} não encontrado no ClickUp.`);
      } else if (status === 401 || status === 403) {
        throw createHttpError(401, `Erro de autenticação com a API do ClickUp: ${errorMessage}`);
      } else if (status === 400 && newStatus) {
        throw createHttpError(400, `Status "${newStatus}" inválido ou não disponível para esta task.`);
      } else if (status) {
        throw createHttpError(status, `Erro ao consultar a API do ClickUp: ${errorMessage}`);
      }
    }
    
    throw createHttpError(500, `Erro inesperado: ${error instanceof Error ? error.message : String(error)}`);
  }
} 