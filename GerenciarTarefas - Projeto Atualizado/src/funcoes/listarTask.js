import { solicitaEscolha } from "../../cli.js";
import { listaDeTarefas } from "../task.js"
import { colorirPendencia } from "./marcarConcluido.js";


// Função que lista a lista de Tarefas com formatação
export function listarTask(){

    console.log(' \n Aqui estão suas Tarefas: \n')

    const exibicaoLista = listaDeTarefas.map((task, index) => {
        return `Tarefa: ${index + 1} \n ${task.titulo} \n ${task.descricao} \n ${colorirPendencia(task)}`;
    });

    exibicaoLista.forEach((taskInfo) => console.log(`\n ${taskInfo}\n `));
    
    console.log('\n Voltando... para o menu principal\n')
    solicitaEscolha()
};

