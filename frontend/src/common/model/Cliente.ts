import { Endereco } from './Endereco';

export interface Cliente {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento?: Date;
  endereco: Endereco;
}
