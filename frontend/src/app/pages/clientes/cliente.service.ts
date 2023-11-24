import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Cliente } from 'src/common/model/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private url: string = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) {}

  public cadastrar(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.url}/cadastrar`, cliente);
  }

  public buscarTodos(): Observable<any> {
    return this.http.get(`${this.url}/buscarTodos`);
  }

  public buscarPorId(id: number): Observable<any> {
    return this.http.get(`${this.url}/buscar/${id}`);
  }

  public editar(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.url}/editar`, cliente);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${this.url}/excluir/${id}`);
  }
}
