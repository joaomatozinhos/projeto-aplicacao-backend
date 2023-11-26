import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-mat-error-input',
  templateUrl: './mat-error-input.component.html',
  styleUrls: ['./mat-error-input.component.css'],
})
export class MatErrorInputComponent implements OnInit {
  @Input() control!: AbstractControl;

  constructor() {}

  ngOnInit(): void {}

  public setError() {
    let errors: ValidationErrors | null = this.control?.errors;

    if (errors?.['required']) return 'Campo obrigatório';

    if (errors?.['minlength'])
      return `Preenchimento mínimo ${
        errors?.['minlength']?.requiredLength
      } caracteres. (${
        errors?.['minlength']?.requiredLength -
        errors?.['minlength']?.actualLength
      })`;

    if (errors?.['maxlength'])
      return `Preenchimento máximo ${
        errors?.['maxlength']?.requiredLength
      } caracteres. (${
        errors?.['maxlength']?.requiredLength -
        errors?.['maxlength']?.actualLength
      })`;

    if (errors?.['cpfInvalido']) return 'CPF inválido';
    if (errors?.['emailInvalido']) return 'E-mail inválido';
    if (errors?.['pattern']) return 'Preenchimento incorreto';
    if (errors?.['telefoneInvalido']) return 'Telefone inválido';
    if (errors?.['celularInvalido']) return 'Celular inválido';
    if (errors?.['cpfExistente']) return 'CPF já cadastrado';
    if (errors?.['cepInvalido']) return 'CEP inválido';

    if (errors?.['max']) return `Número máximo de ${errors?.['max']?.max}`;
    if (errors?.['mask']) return 'Preenchimento incompleto';

    return null;
  }
}
