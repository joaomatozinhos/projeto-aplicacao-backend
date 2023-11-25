import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../cliente.service';
import { Cliente } from 'src/common/model/Cliente';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.css'],
})
export class EdicaoComponent implements OnInit {
  constructor(private clienteService: ClientesService) {}

  ngOnInit(): void {
    // this.editarCliente(4);
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
