import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../cliente.service';
import { Cliente } from 'src/common/model/Cliente';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  constructor(private clienteService: ClientesService) {}

  ngOnInit(): void {
    // this.cadastrarCliente();
  }

  public cadastrarCliente() {
    let cliente: Cliente = {
      nome: 'Sandra Jéssica Moraes',
      cpf: '96467762720',
      email: 'sandra_moraes@sinalmanaus.com.br',
      telefone: '98987438686',
      dataNascimento: new Date('1989-05-06'),
      endereco: {
        cep: '65916530',
        logradouro: 'Rua Cinco',
        bairro: 'Santa Luzia',
        numero: '258',
        cidade: 'Imperatriz',
        uf: 'MA',
      },
    };

    this.clienteService
      .cadastrar(cliente)
      .subscribe((rs) => console.log('CADASTRO REALIZADO COM SUCESSO', rs));
  }
}
