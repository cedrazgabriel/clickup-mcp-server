import { verificarVariaveisAmbiente } from "./config/env";
import { registerAllTools, startServer } from "./tools/index";

// Registra todas as ferramentas
registerAllTools();

// Inicia a aplicação
async function main() {
  try {
    // Verifica as variáveis de ambiente antes de iniciar o servidor
    verificarVariaveisAmbiente();
    await startServer();
  } catch (error) {

    console.error("[Helper Log] ERRO ao iniciar servidor:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("[Helper Log] ERRO CRÍTICO na função principal:", error);
  process.exit(1);
});

