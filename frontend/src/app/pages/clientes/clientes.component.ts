import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/common/model/Cliente';
import { ClientesService } from './cliente.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  public pesquisaForm!: FormGroup;

  displayedColumns: string[] = ['nome', 'cpf', 'email', 'telefone', 'acao'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService
  ) {}

  ngOnInit(): void {
    this.initForm();
    // this.cadastrarCliente();
    // this.buscarTodosClientes();
    // this.buscarClientePorId(4);
    // this.excluirCliente(6);
    // this.editarCliente(4);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public initForm() {
    this.pesquisaForm = this.formBuilder.group({
      nome: new FormControl(''),
      cpf: new FormControl(''),
      uf: new FormControl(''),
      cidade: new FormControl(''),
    });
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
