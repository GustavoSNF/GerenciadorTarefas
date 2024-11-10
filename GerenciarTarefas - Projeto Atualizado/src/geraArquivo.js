import fs from 'fs';

//Cria arquivos json para manipulação mais tarde,
export function criarArquivo(dado){
    fs.writeFile(`${dado}.json` , dado, (error) => {
        if(error){
            console.log('Erro na criação do arquivo');
        } else{
            console.log('Arquivo criado!')
        }
    })
}
