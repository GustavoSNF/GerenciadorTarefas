// }Estrutura das tarefas
export class Task {
    constructor(titulo, descricao = 'Sem descrição', situacao = 'pendente'){
        this.titulo = titulo,
        this.descricao = descricao,
        this.situacao = situacao
    };

};

export const listaDeTarefas = [];