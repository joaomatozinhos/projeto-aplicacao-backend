import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/common/model/Cliente';
import { ClientesService } from '../cliente.service';

import { Inject } from '@angular/core';
import { SnackbarService } from 'src/common/components/snackbar/snackbar.service';

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
    private snackBarService: SnackbarService
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
      error: (erro) =>
        this.snackBarService.openSnackBar(
          'Ocorreu um erro no serviço',
          'Error'
        ),
    });
  }
}
