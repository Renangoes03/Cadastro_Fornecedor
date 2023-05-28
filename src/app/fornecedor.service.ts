import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from './fornecedor';


@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  url = "http://localhost:3000/fornecedor";

  constructor(private http: HttpClient) { }

  getFornecedor(): Observable<Supplier[]> { //Houve a troca de Fornecedor por Supplier. O Supplier é do component fornecedor.ts, export interface Supplier

    return this.http.get<Supplier[]>(this.url); //<Nome do export interface> nesse maior menor se coloca o nome do export interface 
  }
  salvar(fornecedor: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.url, fornecedor); 
  }
  remove(fornecedor: Supplier): Observable<void> {
    return this.http.delete<void>(`${this.url}/${fornecedor.id}`); 
  }
  edit(fornecedor: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.url}/${fornecedor.id}`, fornecedor); 
  }
 
}
