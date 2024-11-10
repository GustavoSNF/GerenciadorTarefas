// Estrutura do Menu.
export const menu = [
    {
        id: 1,
        opcao: 'Criar Tarefa'
    },
    {
        id:2,
        opcao: 'Marcar como concluído'
    },
    {
        id:3,
        opcao: 'Editar Tarefa'
    },
    {
        id:4,
        opcao: 'Visualizar lista'
    },
    {
        id:5,
        opcao: 'Deletar Tarefa'
    },
    {
        id:6,
        opcao: 'Sair'
    }
];  


// Exibi o menu para o usuário com um loop
export function exibirMenu(){
    for(let i = 0; i < menu.length; i++){
        console.log(`${menu[i].id} - ${menu[i].opcao} `);
    }
};