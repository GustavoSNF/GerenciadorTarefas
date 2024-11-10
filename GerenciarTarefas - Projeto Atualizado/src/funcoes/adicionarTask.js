import { solicitaEscolha } from "../../cli.js";
import { listaDeTarefas } from "../task.js";
import { Task } from "../task.js";
import { pergunta } from "../rl.js";
import { capitalizarPalavras } from "./capitalizar.js";
import chalk from "chalk";


// Função assincrona coleta dados. Posteriormente criar função para validar entrada de dados.Função auxiliar
async function coletaDados(){
    const nomeTarefa = await capitalizarPalavras(await pergunta('\n Insira o nome da Tarefa: '));
    const descricaoTarefa = await capitalizarPalavras(await pergunta('\n (opcional) Insira a descrição da tarefa: '));

    return { nomeTarefa, descricaoTarefa };
};


// Função assincrona cria instancias da classe Task.Função principal
export async function adicionarTask(){

    let continuar = true;

    while(continuar){

        const { nomeTarefa, descricaoTarefa } =  await coletaDados()
    
        listaDeTarefas.push(new Task(nomeTarefa, descricaoTarefa));
    
        console.log(chalk.green('\n Tarefa criada !'));

        const questionamento = await pergunta(chalk.yellow(`\n Deseja criar mais tarefas? (S/N) `));

        if(questionamento.trim().toUpperCase() !== 'S'){
            console.log('\n Voltando... para o menu principal\n')
            continuar = false;
        };
    }

    solicitaEscolha();
}