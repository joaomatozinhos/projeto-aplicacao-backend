export interface Endereco {
  cep: string;
  logradouro: string;
  bairro: string;
  complemento?: string | null;
  numero: string;
  uf: string;
  cidade: string;
}
