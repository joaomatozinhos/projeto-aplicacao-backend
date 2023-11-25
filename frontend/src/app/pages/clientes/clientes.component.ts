import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PesquisaCliente } from 'src/common/dto/PesquisaCliente';
import { Cliente } from 'src/common/model/Cliente';
import { ClientesService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  public pesquisaForm!: FormGroup;

  public displayedColumns: string[] = [
    'nome',
    'cpf',
    'email',
    'telefone',
    'acao',
  ];
  public dataSource = new MatTableDataSource<Cliente>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.buscarTodosClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public initForm() {
    this.pesquisaForm = this.formBuilder.group({
      nome: new FormControl(''),
      cpf: new FormControl(''),
      uf: new FormControl(''),
      cidade: new FormControl(''),
    });
  }

  public buscarTodosClientes() {
    this.clienteService
      .buscarTodos()
      .subscribe((rs: Array<Cliente>) => (this.dataSource.data = rs));
  }

  public limparFiltros() {
    this.pesquisaForm.get('nome')?.setValue('');
    this.pesquisaForm.get('cpf')?.setValue('');
    this.pesquisaForm.get('uf')?.setValue('');
    this.pesquisaForm.get('cidade')?.setValue('');
  }

  public getValoresForm() {
    let objFilter: PesquisaCliente = {
      nome: this.pesquisaForm.get('nome')?.value,
      cpf: this.pesquisaForm.get('cpf')?.value,
      uf: this.pesquisaForm.get('uf')?.value,
      cidade: this.pesquisaForm.get('cidade')?.value,
    };

    return objFilter;
  }

  public pesquisarClientes() {
    this.clienteService
      .pesquisar(this.getValoresForm())
      .subscribe((rs: Array<Cliente>) => (this.dataSource.data = rs));
  }

  public openVisualizar(idCliente: any) {
    console.log('abrir página visualizar');
  }

  public openEditar(idCliente: any) {
    console.log('abrir página editar');
  }

  public openModalExcluir(idCliente: any) {
    console.log('abrir modal excluir');
    // this.excluirCliente(6);
  }

  linkTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
