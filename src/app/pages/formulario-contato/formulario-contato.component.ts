import { Component, OnInit } from '@angular/core';
import { SeparadorComponent } from '../../components/separador/separador.component';
import { ContainerComponent } from "../../components/container/container.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../components/contato/contato';

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.inicializarForm();
    this.carregarContato();
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
    console.log(this.contatoForm.value);
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    novoContato.id = id ? parseInt(id) : null;


    this.contatoService.editarOuSalvarContato(novoContato).subscribe(() => {
      this.contatoForm.reset();
      this.router.navigateByUrl('/lista-contatos');
    });
  }

  carregarContato(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.contatoService.buscarContatoPorId(parseInt(id)).subscribe(contato => {
        this.contatoForm.patchValue(contato);
      })
    }

  }

  cancelarForm(){
    this.contatoForm.reset();
    this.router.navigateByUrl('/lista-contatos');
    }
}
