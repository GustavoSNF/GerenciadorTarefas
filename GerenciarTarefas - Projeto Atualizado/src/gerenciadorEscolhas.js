import { adicionarTask } from "./funcoes/adicionarTask.js";
import { listarTask } from "./funcoes/listarTask.js";
import { editarTask } from "./funcoes/editarTask.js";
import { deletarTask } from "./funcoes/deletarTask.js";
import { marcarConcluido } from "./funcoes/marcarConcluido.js";

// Gerencia a opcao selecionada, encaminhando o usuario para cada função do menu.

// Não valida a opção, o dado entregue para essa função já foi tratado pela validaEscolha.
export function gerenciadorEscolhas(opcaoEscolhida){
    switch(opcaoEscolhida){
        case 1:
            adicionarTask();
            break;
        case 2: 
            marcarConcluido();
            break;
        case 3:
            editarTask();
            break;
        case 4:
            listarTask();
            break;
        case 5:
            deletarTask();
            break;
    }
}