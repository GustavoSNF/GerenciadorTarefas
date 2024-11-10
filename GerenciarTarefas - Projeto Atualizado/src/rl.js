import readline from 'readline';

// instanciação do readline, cria um terminal dinâmico
export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Cria uma função síncrona
export function pergunta(texto) {
    return new Promise((resolve) => {
        rl.question(texto, (resposta) => {
            resolve(resposta);
        });
    });
}