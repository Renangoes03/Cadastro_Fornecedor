import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../fornecedor.service';
import { Supplier } from '../fornecedor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { subscribeOn } from 'rxjs';


@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {


  fornecedor: Supplier[] = [];
  formGroupClient: FormGroup;
  isEditing: boolean = false;

  constructor(private fornecedorService: FornecedorService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      active: [''],
      contact: [''],
      category: [''],

    });
  }
  ngOnInit(): void {
    this.loadFornecedor();
  }
  loadFornecedor() {
    this.fornecedorService.getFornecedor().subscribe(
      {
        next: data => this.fornecedor = data,
        error: () => console.log("Erro ao  chamar endpoint")
      }
    )
  }
  salvar() {
    if (this.isEditing) {
      this.fornecedorService.edit(this.formGroupClient.value).subscribe({
        next: () => {
          this.loadFornecedor()
          this.formGroupClient.reset();
                this.isEditing = false;
        }
      })

    } else {
      this.fornecedorService.salvar(this.formGroupClient.value).subscribe({
        next: data => {
          this.fornecedor.push(data);
          this.formGroupClient.reset();
        }
      })
    }
    this.isEditing = false;
  }
  remove(fornecedor: Supplier): void {
    this.fornecedorService.remove(fornecedor).subscribe({
      next: () => this.loadFornecedor()
    })
  }
  edit(fornecedor: Supplier): void {
    this.formGroupClient.setValue(fornecedor);
    this.isEditing = true;
  }
}
