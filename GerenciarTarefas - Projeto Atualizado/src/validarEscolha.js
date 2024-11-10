import chalk from "chalk";
import { menu } from "./menu.js"

// Valida a escolha do usuario em relação a class Menu
export function validarEscolha(opcaoMenu){
    try{
        if(opcaoMenu === menu[opcaoMenu - 1].id){
            console.log(chalk.green(`\n Opção escolhida - ${menu[opcaoMenu - 1].opcao} \n`));
            return opcaoMenu;
        }else{
            throw error;
        }
    }catch(error){
        console.error(chalk.red('\n Opção indisponível. Tente novamente!\n'))
        return undefined
    }
};