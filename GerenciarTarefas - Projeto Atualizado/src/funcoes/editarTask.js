import { listaDeTarefas } from "../task.js"
import { pergunta } from "../rl.js"
import { solicitaEscolha } from "../../cli.js"
import { capitalizarPalavras } from "./capitalizar.js";
import chalk from "chalk";

// Função que busca o titulo informado na lista de tarefas
export function acharTask(taskTitulo){
    return listaDeTarefas.find((tarefa) => {
        if(tarefa.titulo === taskTitulo){
            return tarefa;
        };
    })
}


// Função principal
export async function editarTask(){
    
    let continuar = true

    while(continuar){

        const taskTitulo = await capitalizarPalavras(await pergunta('Insira o titulo da tarefa que será editada: ','\n'))

        const taskEncontrada = acharTask(taskTitulo);

        if(taskEncontrada === undefined){
            console.log(chalk.red('\n Tarefa não encontrada!'))

            const continuar = await pergunta(chalk.yellow('\n Deseja tentar Novamente? (S/N) '));

            if(continuar.trim().toUpperCase() !== 'S'){
                console.log('\n Voltando... para o menu principal\n ')
                solicitaEscolha()
                return 
            } else{
                //Ver se da pra apagar isso sem quebrar o código 
            }

        }else{
                continuar = false;
                await gerenciarOpcoes(taskEncontrada)  
        }
    }
}


// Array com as opções. Possibilita expansão
const escolhasPossiveis = [
    {
        id: 1,
        situacao: 'Título'
    },
    {
        id: 2,
        situacao: 'Descrição'
    },
    {
        id: 3,
        situacao: 'Voltar para o menu principal'
    }
]


// Função que formata o menu de opções
async function exibirOpcoes(){
    const listaOpcoes = escolhasPossiveis.map((opcao) => {
        return `${opcao.id} - ${opcao.situacao}`
    });

    listaOpcoes.forEach((opcao) => {
        console.log(opcao);
    })
}


// Função que captura opcao do usuário.
async function selecionarOpcoes(){
    
    let opcaoMenu = null
    
    // Validação de entradas;
    while(!opcaoMenu){
        await exibirOpcoes()

        const opcaoSelecionada = await pergunta('\n O que deseja mudar na tarefa: ')
        
        opcaoMenu = escolhasPossiveis.find((opcao) => opcao.id === Number(opcaoSelecionada));

        if (!opcaoMenu) {
            console.log(chalk.red('\n Opção inválida. Tente novamente! \n'));
        }else{
            return opcaoMenu;
        }


    }

}


// Função de gerenciamento das opções
async function gerenciarOpcoes(taskEncontrada){

    const opcaoMenu = await selecionarOpcoes();

    // Gerenciamentos das opções
    switch(opcaoMenu.id){
        case 1:
            await alterarTitulo(taskEncontrada);
            await continuarEdicao();
            break;
        case 2:
            await alterarDescricao(taskEncontrada)
            await continuarEdicao();
            break;
        case 3:
            console.log('\n Voltando... para o menu principal \n')
            solicitaEscolha()
            break

    }
}



// Funções auxiliares do gerenciadorOpcoes 
async function alterarTitulo(taskEncontrada){
    const novoTitulo = await capitalizarPalavras(await pergunta(`\n Título atual: ${chalk.yellow(taskEncontrada.titulo)} - Insira o novo Título: `));
    taskEncontrada.titulo = novoTitulo;
    console.log(chalk.green('\n Titulo Alterado! \n'));
    console.log(taskEncontrada)
}

async function alterarDescricao(taskEncontrada){
    const novaDescricao = await capitalizarPalavras(await pergunta(`\n Descrição atual: ${chalk.yellow(taskEncontrada.descricao)} - Insira o novo Descrição: `));
    taskEncontrada.descricao = novaDescricao;
    console.log(chalk.green('\n Descrição Alterada!\n'));
    console.log(taskEncontrada)
}


export async function continuarEdicao(){

    let continuar = true
    
    while(continuar){
        const resposta = await pergunta(chalk.yellow('\n Deseja editar outra tarefa? (S/N) '));
        if(resposta.trim().toUpperCase() === 'S'){
            await editarTask()
        }else{
            console.log('\n Voltando... para o menu principal\n')
            continuar = false;
            solicitaEscolha()
        }
    }
}