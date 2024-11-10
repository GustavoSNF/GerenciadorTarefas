import { acharTask } from "./editarTask.js";
import { capitalizarPalavras } from "./capitalizar.js";
import { pergunta } from "../rl.js";
import { solicitaEscolha } from "../../cli.js";
import chalk from "chalk";


export async function marcarConcluido(){

    let continuar = true;

    while(continuar){
        
        const taskSolicitada = await capitalizarPalavras(await pergunta('\nInsira o titulo da tarefa que deseja concluir: '))

        const taskEncontrada = await acharTask(taskSolicitada)

        if(taskEncontrada === undefined){
            
            console.log(chalk.red('\n Tarefa não encontrada!'));

            const tentarNovamente = await capitalizarPalavras(await pergunta(chalk.yellow('\n Deseja tentar novamente? (S/N) ')));

            if(tentarNovamente !== 'S'){
                console.log('\n Voltando... para o menu principal\n')
                continuar = false; //alteração sem teste
                solicitaEscolha()
                return
            }

        }else{

            await concluir(taskEncontrada)
        }

    }

}


async function concluir(taskEncontrada){
    
    const resposta = await capitalizarPalavras(await pergunta(chalk.yellow(`\n Situação atual: ${colorirPendencia(taskEncontrada)} - Deseja concluí-la? (S/N) `)));

    if(resposta != 'S'){
        console.log(chalk.red('\n Cancelando conclusão... voltando para o menu principal\n'))
        solicitaEscolha()
    } else{
        taskEncontrada.situacao = 'Concluído';
        console.log(chalk.green('\n Tarefa concluída!'));
        await continuarConclusao()
    }
   
}



async function continuarConclusao(){

    let continuar = true
    
    while(continuar){
        const resposta = await pergunta(chalk.yellow('\n Deseja concluir outra tarefa? (S/N) '));
        if(resposta.trim().toUpperCase() === 'S'){
            await marcarConcluido()
        }else{
            console.log('\n Voltando... para o menu principal\n')
            continuar = false;
            solicitaEscolha()
        }
    }
}

export function colorirPendencia(taskEncontrada){

     if(taskEncontrada.situacao === 'pendente'){

        return chalk.red(taskEncontrada.situacao)

     }else{
        
        return chalk.green(taskEncontrada.situacao)
     }
}