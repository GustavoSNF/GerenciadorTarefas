import { exibirMenu } from "./src/menu.js";
import { rl } from "./src/rl.js";
import { validarEscolha } from "./src/validarEscolha.js";
import { gerenciadorEscolhas } from "./src/gerenciadorEscolhas.js";
import chalk from "chalk";

// Mensagem inicial
console.log(chalk.green(' \n Bem vindo ao seu gerenciador de Tarefas! \n \n Menu \n'));


//Exibi o menu e valida a escolha do usuário
export function solicitaEscolha(){
    
    exibirMenu();

    // Coleta da opção.
    
    rl.question('\n Escolha uma opção: ', (opcaoMenu) => {
        opcaoMenu = parseInt(opcaoMenu)

        if(opcaoMenu !== 6){
            const escolhaValida = validarEscolha(opcaoMenu);
            //valida se a opção é valida, caso contrário, o menu retorna
            if(escolhaValida != undefined){
                
                // Encaminha o código para a função que o usuário selecionou
                gerenciadorEscolhas(escolhaValida);
    
            }else{
                solicitaEscolha()
            };

        }else{
            
            console.log('\n Encerrando o programa....');
            rl.close();
        }
    })

}

// Inicia o programa
solicitaEscolha();