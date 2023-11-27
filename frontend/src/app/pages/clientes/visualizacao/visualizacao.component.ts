import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TypeButton } from 'src/common/enum/TypeButton.enum';
import { ButtonTitlePage } from 'src/common/model/ButtonTitlePage';
import { Cliente } from 'src/common/model/Cliente';
import { ClientesService } from '../cliente.service';

import { Inject } from '@angular/core';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.css'],
})
export class VisualizacaoComponent implements OnInit {
  public idCliente!: number;
  public dadosCliente!: Cliente;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteService: ClientesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.idCliente = this.data.idCliente;
    this.buscarClientePorId(this.idCliente);
  }

  public buscarClientePorId(id: number) {
    this.clienteService.buscarPorId(id).subscribe({
      next: (rs) => {
        if (rs != null) {
          this.dadosCliente = rs;
        }
      },
      error: (erro) => this.openSnackBar('Ocorreu um erro no serviço'),
    });
  }

  public openSnackBar(msg: string) {
    this.snackBar.open(`${msg}`, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3 * 1000,
    });
  }
}
