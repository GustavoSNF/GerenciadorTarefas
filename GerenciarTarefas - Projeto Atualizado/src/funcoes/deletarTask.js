import { listaDeTarefas } from "../task.js";
import { acharTask } from "./editarTask.js";
import { pergunta } from "../rl.js";
import { solicitaEscolha } from "../../cli.js";
import { capitalizarPalavras } from "./capitalizar.js";
import chalk from "chalk";

export async function deletarTask() {
    let continuar = true;

    while (continuar) {

        const taskTitulo = await capitalizarPalavras(await pergunta('\n Insira o título da tarefa que será deletada: '));

        const taskEncontrada = acharTask(taskTitulo);

        if (taskEncontrada === undefined) {
            console.log(chalk.red('\n Tarefa não encontrada!'));
            const tentarNovamente = await pergunta(chalk.yellow('\n Deseja tentar novamente? (S/N) '));

            if (tentarNovamente.trim().toUpperCase() !== 'S') {
                console.log('\n Voltando... para o menu principal \n ')
                solicitaEscolha();
                return; // Retorna ao menu principal
            }

        } else {
            const confirmacao = await pergunta(`\n Tarefa: ${chalk.yellow(taskEncontrada.titulo)} - Deseja realmente excluí-la? (S/N) `);
            
            if (confirmacao.trim().toUpperCase() === 'S') {
                deletarItem(taskEncontrada);
            } else {
                console.log(chalk.red('\n Exclusão cancelada... voltando ao menu principal\n'));
                solicitaEscolha();
                return; // Retorna ao menu principal
            }

            // Pergunta ao usuário se deseja deletar outra tarefa
            const resposta = await pergunta(chalk.yellow('\n Deseja deletar outra tarefa? (S/N) '));
            if (resposta.trim().toUpperCase() !== 'S') {
                continuar = false; // Sai do loop
                solicitaEscolha();
            }
        }
    }
}

function deletarItem(taskEncontrada) {
    const indiceTarefa = listaDeTarefas.indexOf(taskEncontrada);
    if (indiceTarefa > -1) {
        listaDeTarefas.splice(indiceTarefa, 1);
        console.log(chalk.green(`\n Tarefa: "${taskEncontrada.titulo}" deletada!`));
    } else {
        console.log(chalk.red(`\n Erro ao deletar: tarefa não encontrada na lista.`));
    }
}
