import { Component, OnInit } from '@angular/core';
import { SeparadorComponent } from '../../components/separador/separador.component';
import { ContainerComponent } from "../../components/container/container.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [SeparadorComponent, ContainerComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.css'
})

export class FormularioContatoComponent implements OnInit {
  contatoForm!: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private router: Router){}

  ngOnInit(){
    this.inicializarForm();
  }

  inicializarForm(){
    this.contatoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      telefone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redes: new FormControl(''),
      observacoes: new FormControl('', Validators.required),
    })
  }

  enviarForm(){
    const novoContato = this.contatoForm.value;
    this.contatoService.salvarContato(novoContato);
    this.contatoForm.reset();
    this.router.navigateByUrl('/lista-contatos');
  }

  cancelarForm(){
    this.contatoForm.reset();
    }
}
