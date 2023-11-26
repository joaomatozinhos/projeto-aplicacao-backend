import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TypeButton } from 'src/common/enum/TypeButton.enum';
import { ButtonTitlePage } from 'src/common/model/ButtonTitlePage';
import { ClientesService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/common/model/Cliente';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.css'],
})
export class VisualizacaoComponent implements OnInit {
  public buttonsTitlePage: ButtonTitlePage[] = [
    { nome: 'voltar', tipo: TypeButton.SECONDARY, url: 'clientes' },
  ];

  public idCliente!: number;
  public dadosCliente!: Cliente;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClientesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.idCliente = this.route.snapshot.params['id'];
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
