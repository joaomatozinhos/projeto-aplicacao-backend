import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/common/components/snackbar/snackbar.service';
import { PesquisaCliente } from 'src/common/dto/PesquisaCliente';
import { TypeButton } from 'src/common/enum/TypeButton.enum';
import { DialogTwoButtonsComponent } from 'src/common/modal/dialog-two-buttons/dialog-two-buttons.component';
import { ButtonTitlePage } from 'src/common/model/ButtonTitlePage';
import { Cliente } from 'src/common/model/Cliente';
import { UtilService } from 'src/common/util/util.service';
import { ClientesService } from './cliente.service';
import { VisualizacaoComponent } from './visualizacao/visualizacao.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  public buttonsTitlePage: ButtonTitlePage[] = [
    {
      nome: 'novo cadastro',
      tipo: TypeButton.PRIMARY,
      url: 'clientes/cadastro',
    },
  ];

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
    private router: Router,
    private snackBarService: SnackbarService,
    private utilService: UtilService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
    // this.buscarTodosClientes();
    this.simularBuscaClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public createForm() {
    this.pesquisaForm = this.formBuilder.group({
      nome: new FormControl(''),
      cpf: new FormControl(''),
      uf: new FormControl(''),
      cidade: new FormControl(''),
    });
  }

  public buscarTodosClientes() {
    this.clienteService.buscarTodos().subscribe({
      next: (rs: Array<Cliente>) => {
        (this.dataSource.data = rs), console.log('DADOS', rs);
      },
      error: (erro) =>
        this.snackBarService.openSnackBar(
          'Ocorreu um erro no serviço',
          'Error'
        ),
    });
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
    this.clienteService.pesquisar(this.getValoresForm()).subscribe({
      next: (rs: Array<Cliente>) => (this.dataSource.data = rs),
      error: (erro) =>
        this.snackBarService.openSnackBar(
          'Ocorreu um erro no serviço',
          'Error'
        ),
    });
  }

  public openEditar(idCliente: any) {
    this.router.navigateByUrl(`clientes/edicao/${idCliente}`);
  }

  public openModalVisualizar(idCliente: any) {
    const dialogRef = this.dialog.open(VisualizacaoComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        idCliente: idCliente,
      },
    });

    dialogRef.afterClosed().subscribe((rs) => {});
  }

  public openModalExcluir(idCliente: any) {
    const dialogRef = this.dialog.open(DialogTwoButtonsComponent, {
      data: {
        title: 'Atenção!',
        body: 'Deseja realmente excluir o cliente cadastrado?',
        btn1: 'Não',
        btn2: 'Sim, desejo excluir',
      },
    });

    dialogRef.afterClosed().subscribe((rs) => {
      if (rs) {
        this.excluirCliente(idCliente);
      }
    });
  }

  public excluirCliente(id: number) {
    this.clienteService.excluir(id).subscribe({
      next: (rs) => {
        this.snackBarService.openSnackBar(
          'Exclusão de cliente realizada com sucesso',
          'Success'
        );
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      error: (erro) =>
        this.snackBarService.openSnackBar(
          'Ocorreu um erro no serviço',
          'Error'
        ),
    });
  }

  public simularBuscaClientes() {
    this.dataSource.data = this.utilService.getJsonClientes();
  }
}
