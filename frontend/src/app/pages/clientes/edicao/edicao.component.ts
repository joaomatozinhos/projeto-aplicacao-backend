import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/common/components/snackbar/snackbar.service';
import { TypeButton } from 'src/common/enum/TypeButton.enum';
import { ButtonTitlePage } from 'src/common/model/ButtonTitlePage';
import { Cliente } from 'src/common/model/Cliente';
import { UtilService } from 'src/common/util/util.service';
import { ClientesService } from '../cliente.service';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.css'],
})
export class EdicaoComponent implements OnInit {
  public buttonsTitlePage: ButtonTitlePage[] = [
    { nome: 'voltar', tipo: TypeButton.SECONDARY, url: 'clientes' },
    { nome: 'salvar', tipo: TypeButton.PRIMARY },
  ];

  public idCliente!: number;

  public dadosPessoaisForm!: FormGroup;
  public enderecoForm!: FormGroup;

  public dadosPessoaisFormEstaInvalido!: boolean;
  public enderecoFormEstaInvalido!: boolean;

  public step = 1;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private utilService: UtilService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.idCliente = this.route.snapshot.params['id'];
    this.createForm();
    // this.buscarClientePorId(this.idCliente);
    this.simularBuscaClientePorId(this.idCliente);
  }

  public createForm() {
    this.dadosPessoaisForm = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl({ value: '', disabled: true }),
    });

    this.enderecoForm = this.formBuilder.group({
      cep: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      bairro: new FormControl('', [Validators.required]),
      complemento: new FormControl(''),
      numero: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
    });
  }

  public buscarClientePorId(id: number) {
    this.clienteService.buscarPorId(id).subscribe({
      next: (rs: Cliente) => {
        if (rs != null) {
          this.preencherDadosCliente(rs);
        }
      },
      error: (erro) =>
        this.snackBarService.openSnackBar(
          'Ocorreu um erro no serviço',
          'Error'
        ),
    });
  }

  public preencherDadosCliente(dados: Cliente) {
    this.dadosPessoaisForm.patchValue({
      nome: dados.nome,
      cpf: dados.cpf,
      email: dados.email,
      telefone: dados.telefone,
      dataNascimento: this.utilService.formatarData(dados.dataNascimento),
    });

    this.enderecoForm.patchValue({
      cep: dados.endereco.cep,
      logradouro: dados.endereco.logradouro,
      bairro: dados.endereco.bairro,
      complemento: dados.endereco.complemento,
      numero: dados.endereco.numero,
      uf: dados.endereco.uf,
      cidade: dados.endereco.cidade,
    });
  }

  public consultarCep() {
    this.clienteService
      .consultarCep(this.enderecoForm.get('cep')?.value)
      .subscribe({
        next: (rs) => {
          if (rs != null) {
            this.preencherDadosEndereco(rs);
          }
        },
        error: (erro) =>
          this.snackBarService.openSnackBar('CEP não encontrado', 'Warn'),
      });
  }

  public preencherDadosEndereco(dados: any) {
    this.enderecoForm.patchValue({
      cep: dados.cep,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      complemento: dados.complemento,
      uf: dados.uf,
      cidade: dados.localidade,
    });

    this.desabilitarCamposEndereco();
  }

  public desabilitarCamposEndereco() {
    Object.keys(this.enderecoForm.controls).forEach((key) => {
      let control = this.enderecoForm.get(key);
      if (control?.value != '' && key != 'cep') {
        control?.disable();
      }
    });
  }

  public getCliente(): Cliente {
    let cliente: Cliente = {
      id: this.idCliente,
      nome: this.dadosPessoaisForm.get('nome')?.value,
      cpf: this.dadosPessoaisForm.get('cpf')?.value,
      email: this.dadosPessoaisForm.get('email')?.value,
      telefone: this.dadosPessoaisForm.get('telefone')?.value,
      dataNascimento: this.dadosPessoaisForm.get('dataNascimento')?.value,
      endereco: {
        cep: this.enderecoForm.get('cep')?.value,
        logradouro: this.enderecoForm.get('logradouro')?.value,
        bairro: this.enderecoForm.get('bairro')?.value,
        complemento: this.enderecoForm.get('complemento')?.value,
        numero: this.enderecoForm.get('numero')?.value,
        uf: this.enderecoForm.get('uf')?.value,
        cidade: this.enderecoForm.get('cidade')?.value,
      },
    };

    return cliente;
  }

  public salvarCliente() {
    if (
      this.validarForm(this.dadosPessoaisForm) &&
      this.validarForm(this.enderecoForm)
    ) {
      this.clienteService.editar(this.getCliente()).subscribe({
        next: (rs) => {
          this.snackBarService.openSnackBar(
            'Cliente editado com sucesso',
            'Success'
          );
          setTimeout(() => {
            this.utilService.linkTo('clientes');
          }, 2000);
        },
        error: (erro) =>
          this.snackBarService.openSnackBar(
            'Ocorreu um erro no serviço',
            'Error'
          ),
      });
    } else {
      this.snackBarService.openSnackBar(
        'Preencha todos os campo obrigatórios antes de editar',
        'Warn'
      );
    }
  }

  public validarForm(form: FormGroup) {
    form.markAllAsTouched();
    if (form.valid) {
      return true;
    } else {
      this.snackBarService.openSnackBar(
        'Preencha todos os campo obrigatórios antes de editar',
        'Warn'
      );
      return false;
    }
  }

  /**
   * Conjunto de funções responsáveis pela navegação entre os accordions
   *
   */
  setStep(index: number) {
    this.step = index;
  }

  nextOrPrevStep(stepAtual: number, action: string) {
    if (action == 'next') {
      this.step++;
    } else {
      this.step--;
    }
  }

  public simularBuscaClientePorId(id: number) {
    const cliente = this.utilService
      .getJsonClientes()
      .filter((cliente) => cliente.id == id);
    this.preencherDadosCliente(cliente[0]);
  }
}
