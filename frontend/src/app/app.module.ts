import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaInicialComponent } from './pages/tela-inicial/tela-inicial.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CadastroComponent } from './pages/clientes/cadastro/cadastro.component';
import { EdicaoComponent } from './pages/clientes/edicao/edicao.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaInicialComponent,
    ClientesComponent,
    CadastroComponent,
    EdicaoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
