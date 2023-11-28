import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private router: Router) {}

  public linkTo(url: string) {
    this.router.navigateByUrl(url);
  }

  public formatarData(data: any) {
    return new Date(`${data}T00:00`);
  }

  public getJsonClientes(): Cliente[] {
    const JSON_CLIENTES: Cliente[] = [
      {
        id: 1,
        nome: 'Iago Oliver Melo',
        cpf: '29836734805',
        email: 'iago-melo91@live.com',
        telefone: '82996231975',
        dataNascimento: this.formatarData('1978-10-14'),
        endereco: {
          cep: '57020-370',
          logradouro: 'Rua Coronel Vieira Peixoto',
          bairro: 'Centro',
          numero: '300',
          complemento: null,
          cidade: 'Maceió',
          uf: 'AL',
        },
      },
      {
        id: 2,
        nome: 'Emilly Elisa da Conceição',
        cpf: '86920170604',
        email: 'emilly-daconceicao83@w3ag.com',
        telefone: '98992466794',
        dataNascimento: this.formatarData('1957-08-22'),
        endereco: {
          cep: '65918-204',
          logradouro: 'Rua Quarenta e Nove',
          bairro: 'Vila Vitória',
          numero: '595',
          complemento: 'APTO 302',
          cidade: 'Imperatriz',
          uf: 'MA',
        },
      },
      {
        id: 3,
        nome: 'Giovanna Gabrielly Campos',
        cpf: '26410951221',
        email: 'giovanna.gabrielly.campos@jglima.com.br',
        telefone: '81996778246',
        dataNascimento: this.formatarData('1969-12-31'),
        endereco: {
          cep: '53425-020',
          logradouro: 'Rua Alvarenga',
          bairro: 'Nossa Senhora da Conceição',
          numero: 'APTO 304',
          complemento: 'APTO 304',
          cidade: 'Paulista',
          uf: 'PE',
        },
      },
      {
        id: 4,
        nome: 'Tânia Barbosa',
        cpf: '76812470414',
        email: 'tania-barbosa82@morada.com.br',
        telefone: '81992704848',
        dataNascimento: this.formatarData('1975-11-13'),
        endereco: {
          cep: '54517-110',
          logradouro: 'Rua Vinte e Dois de Setembro',
          bairro: 'Cidade Garapu',
          numero: '576',
          complemento: null,
          cidade: 'Cabo de Santo Agostinho',
          uf: 'PE',
        },
      },
      {
        id: 5,
        nome: 'Oliver André Barros',
        cpf: '51437481353',
        email: 'oliver_andre_barros@truran.com.br',
        telefone: '68997749573',
        dataNascimento: this.formatarData('1953-03-13'),
        endereco: {
          cep: '69911-063',
          logradouro: 'Rua Plácido de Castro',
          bairro: 'Aeroporto Velho',
          numero: '325',
          complemento: 'APTO 101',
          cidade: 'Rio Branco',
          uf: 'AC',
        },
      },
      {
        id: 7,
        nome: 'Ayla Clara Farias',
        cpf: '07796358687',
        email: 'ayla.clara.farias@sectron.com.br',
        telefone: '47997270198',
        dataNascimento: this.formatarData('1970-01-01'),
        endereco: {
          cep: '89036482',
          logradouro: 'Rua Fritz Wolfram Neto',
          bairro: 'Velha',
          numero: '463',
          complemento: '',
          cidade: 'Blumenau',
          uf: 'SC',
        },
      },
      {
        id: 8,
        nome: 'Luiz Juan Campos',
        cpf: '74167955750',
        email: 'luiz.juan.campos@gilbertorodrigues.com',
        telefone: '63983732533',
        dataNascimento: this.formatarData('1978-05-25'),
        endereco: {
          cep: '77023-008',
          logradouro: 'Quadra ACSE 80 Avenida LO 19',
          bairro: 'Plano Diretor Sul',
          numero: '76',
          complemento: '',
          cidade: 'Palmas',
          uf: 'TO',
        },
      },
      {
        id: 9,
        nome: 'Letícia Elaine Assis',
        cpf: '86342769532',
        email: 'leticia-assis71@live.com.pt',
        telefone: '82994484307',
        dataNascimento: this.formatarData('1992-02-11'),
        endereco: {
          cep: '57044-109',
          logradouro: 'Rua Ferroviário Geraldo Teles de Moura',
          bairro: 'São Jorge',
          numero: '353',
          complemento: 'Lado B',
          cidade: 'Maceió',
          uf: 'AL',
        },
      },
      {
        id: 10,
        nome: 'Raul Murilo Caldeira',
        cpf: '92730911561',
        email: 'raul_murilo_caldeira@igi.com.br',
        telefone: '71987988943',
        dataNascimento: this.formatarData('1973-05-17'),
        endereco: {
          cep: '40368-425',
          logradouro: 'Vila 25 de Fevereiro',
          bairro: 'Liberdade',
          numero: '96',
          complemento: '',
          cidade: 'Salvador',
          uf: 'BA',
        },
      },
    ];

    return JSON_CLIENTES;
  }
}
