import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../cliente.service';
import { Cliente } from 'src/common/model/Cliente';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.css'],
})
export class VisualizacaoComponent implements OnInit {
  constructor(private clienteService: ClientesService) {}

  ngOnInit(): void {
    // this.buscarClientePorId(4);
  }

  public buscarClientePorId(id: number) {
    this.clienteService.buscarPorId(id).subscribe((rs: Cliente) => {
      if (rs != null) {
        console.log(`BUSCA DO ID ${id} REALIZADA COM SUCESSO`, rs);
      }
    });
  }
}
