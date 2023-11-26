import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from 'src/common/model/Cliente';
import { ClientesService } from '../cliente.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  public dadosPessoaisForm!: FormGroup;
  public enderecoForm!: FormGroup;

  public dadosPessoaisFormEstaInvalido!: boolean;
  public enderecoFormEstaInvalido!: boolean;

  public step = 1;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.dadosPessoaisForm = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl(''),
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

  public consultarCep() {
    this.clienteService
      .consultarCep(this.enderecoForm.get('cep')?.value)
      .subscribe({
        next: (rs) => {
          if (rs != null) {
            this.preencherDadosEndereco(rs);
          }
        },
        error: (erro) => this.openSnackBar('CEP não encontrado'),
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
        numero: this.enderecoForm.get('complemento')?.value,
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
      this.clienteService.cadastrar(this.getCliente()).subscribe({
        next: (rs) => {
          this.openSnackBar('Cliente cadastrado com sucesso');
          setTimeout(() => {
            this.linkTo('clientes');
          }, 3000);
        },
        error: (erro) => this.openSnackBar('Ocorreu um erro no serviço'),
      });
    } else {
      this.openSnackBar('Preencha todos os campo obrigatórios antes de salvar');
    }
  }

  public validarForm(form: FormGroup) {
    form.markAllAsTouched();
    if (form.valid) {
      return true;
    } else {
      this.openSnackBar('Preencha todos os campo obrigatórios');
      return false;
    }
  }

  public openSnackBar(msg: string) {
    this.snackBar.open(`${msg}`, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3 * 1000,
    });
  }

  linkTo(url: string) {
    this.router.navigateByUrl(url);
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
}
