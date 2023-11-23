import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/clientes/cadastro/cadastro.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { EdicaoComponent } from './pages/clientes/edicao/edicao.component';
import { TelaInicialComponent } from './pages/tela-inicial/tela-inicial.component';

const routes: Routes = [
  { path: '', component: TelaInicialComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/cadastro', component: CadastroComponent },
  { path: 'clientes/edicao/:id', component: EdicaoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
