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
    const JSON_CLIENTES: Cliente[] = [
      {
        id: 1,
        nome: 'Iago Oliver Melo',
        cpf: '29836734805',
        email: 'iago-melo91@live.com',
        telefone: '82996231975',
        dataNascimento: this.utilService.formatarData('1978-10-14'),
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
        dataNascimento: this.utilService.formatarData('1957-08-22'),
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
        dataNascimento: this.utilService.formatarData('1969-12-31'),
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
        dataNascimento: this.utilService.formatarData('1975-11-13'),
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
        dataNascimento: this.utilService.formatarData('1953-03-13'),
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
        dataNascimento: this.utilService.formatarData('1970-01-01'),
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
        dataNascimento: this.utilService.formatarData('1978-05-25'),
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
        dataNascimento: this.utilService.formatarData('1992-02-11'),
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
        dataNascimento: this.utilService.formatarData('1973-05-17'),
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

    this.dataSource.data = JSON_CLIENTES;
  }
}
