export function formatarNome(nome: string) {
  if (!nome) return "";

  const partes = nome.trim().split(" ");

  if (partes.length === 1) {
    return partes[0];
  }

  const primeira = partes[0];
  const ultima = partes[partes.length - 1];

  return `${primeira} ${ultima}`;
}
