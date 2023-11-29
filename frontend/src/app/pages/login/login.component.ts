import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/common/components/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public usuarioEstaAutenticado!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.loginForm = this.formBuilder.group({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public validarUsuario() {
    let user = this.loginForm.get('user')?.value;
    let password = this.loginForm.get('password')?.value;

    if (user == 'admin' && password == '123456') {
      this.usuarioEstaAutenticado = true;
      this.snackBarService.openSnackBar(
        'Usuário autenticado com sucesso',
        'Success'
      );
      setTimeout(() => {
        this.router.navigateByUrl('/dashboard');
      }, 2000);
    } else {
      this.snackBarService.openSnackBar('Usuário ou senha inválidos', 'Error');
    }
  }
}
