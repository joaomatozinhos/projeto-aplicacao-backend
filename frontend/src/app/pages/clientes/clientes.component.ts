import { Component, OnInit } from '@angular/core';
import { ClientesService } from './cliente.service';
import { Cliente } from 'src/common/model/Cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  constructor(private clienteService: ClientesService) {}

  ngOnInit(): void {
    // this.cadastrarCliente();
    // this.buscarTodosClientes();
    // this.buscarClientePorId(4);
    // this.excluirCliente(6);
    // this.editarCliente(4);
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

  public buscarTodosClientes() {
    this.clienteService
      .buscarTodos()
      .subscribe((rs) =>
        console.log('BUSCA DE TODOS REALIZADA COM SUCESSO', rs)
      );
  }

  public buscarClientePorId(id: number): Promise<Cliente> {
    return new Promise((resolve, reject) => {
      let cliente!: Cliente;

      this.clienteService.buscarPorId(id).subscribe((rs: Cliente) => {
        if (rs != null) {
          console.log(`BUSCA DO ID ${id} REALIZADA COM SUCESSO`, rs);
          cliente = rs;
          resolve(cliente);
        } else {
          reject();
        }
      });

      return cliente;
    });
  }

  public async editarCliente(id: number) {
    let cliente: Cliente = await this.buscarClientePorId(id);
    cliente.nome = 'Tânia Barbosa';

    this.clienteService
      .editar(cliente)
      .subscribe((rs) => console.log('EDIÇÃO REALIZADA COM SUCESSO', rs));
  }

  public excluirCliente(id: number) {
    this.clienteService
      .excluir(id)
      .subscribe((rs) =>
        console.log(`EXCLUSÃO DO ${id} REALIZADA COM SUCESSO`, rs)
      );
  }
}
