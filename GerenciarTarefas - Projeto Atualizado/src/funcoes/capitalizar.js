export async function capitalizarPalavras(str) {
    return await str
      .split(" ") // Divide a string em palavras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palavra
      .join(" "); // Junta as palavras de volta em uma string
  }