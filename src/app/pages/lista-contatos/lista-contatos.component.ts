import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ContatoService } from '../../services/contato.service';
import { ContainerComponent } from "../../components/container/container.component";
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";
import { SeparadorComponent } from "../../components/separador/separador.component";
import { ContatoComponent } from "../../components/contato/contato.component";
import { Contato } from "../../components/contato/contato";
import { PerfilContatoComponent } from "../perfil-contato/perfil-contato.component";


@Component({
  selector: 'app-lista-contatos',
  standalone: true,
  imports: [ContainerComponent, CabecalhoComponent, SeparadorComponent, ContatoComponent, CommonModule, FormsModule, RouterLink, PerfilContatoComponent],
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.css'
})

export class ListaContatosComponent implements OnInit {
  alfabeto: string = 'abcdefghijklmnopqrstwuvxyz';
  contatos: Contato[] = [];
  filtroPorTexto: string ="";

  constructor(private contatoService: ContatoService){}

  ngOnInit() {
    this.contatoService.obterContatos().subscribe(listaDeContatos => {
      return this.contatos = listaDeContatos;
    });
  }

  filtrarContatosPorTexto(): Contato[]{
    if(!this.filtroPorTexto) {
      return this.contatos;
    }
    return this.contatos.filter(contato => {
      return contato.nome.toLowerCase().includes(this.filtroPorTexto.toLowerCase());
    })
  }

  filtrarContatosPorLetra(letra: string): Contato[]{
    return this.filtrarContatosPorTexto().filter(contato => {
      return contato.nome.toLowerCase().startsWith(letra);
    });
  }
}
