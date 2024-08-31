import { ContatoService } from './../../services/contato.service';
import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from "../../components/container/container.component";
import { Contato } from '../../components/contato/contato';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  imports: [ContainerComponent, RouterLink],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css'
})
export class PerfilContatoComponent implements OnInit{
  contato : Contato = {
    id: 0,
    nome: '',
    telefone: '',
    email: '',
    aniversario: '',
    redes: ''
  }

  constructor(
    private activedRoute: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router
  ){}

  ngOnInit(){
    const id = this.activedRoute.snapshot.paramMap.get("id");

    if(id){
      this.contatoService.buscarContatoPorId(parseInt(id)).subscribe(contato =>
        this.contato = contato
      );
    }
  }

  excluir(){
    if(this.contato.id){
      this.contatoService.excluirContato(this.contato.id).subscribe(() =>
        this.router.navigateByUrl('/lista-contatos')
      )
    }
  }



}
