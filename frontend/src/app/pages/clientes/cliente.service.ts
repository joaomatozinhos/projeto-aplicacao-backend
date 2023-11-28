import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { PesquisaCliente } from 'src/common/dto/PesquisaCliente';
import { Cliente } from 'src/common/model/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private LOCAL_URL: string = 'http://localhost:8080/clientes';
  // private PROD_URL: string = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) {}

  public cadastrar(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.LOCAL_URL}/cadastrar`, cliente);
  }

  public buscarTodos(): Observable<any> {
    return this.http.get(`${this.LOCAL_URL}/buscarTodos`);
  }

  public buscarPorId(id: number): Observable<any> {
    return this.http.get(`${this.LOCAL_URL}/buscar/${id}`);
  }

  public editar(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.LOCAL_URL}/editar`, cliente);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${this.LOCAL_URL}/excluir/${id}`);
  }

  public pesquisar(filter: PesquisaCliente): Observable<any> {
    return this.http.post(`${this.LOCAL_URL}/pesquisar`, filter);
  }

  public consultarCep(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
