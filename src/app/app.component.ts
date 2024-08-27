import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from "./components/container/container.component";
import { CabecalhoComponent } from "./components/cabecalho/cabecalho.component";
import { SeparadorComponent } from "./components/separador/separador.component";
import { ContatoComponent } from "./components/contato/contato.component";
import { Contato } from './interfaces';

import agenda from "./agenda.json";
import { FormsModule } from '@angular/forms';
import { FormularioContatoComponent } from "./pages/formulario-contato/formulario-contato.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ContainerComponent, CabecalhoComponent, SeparadorComponent, ContatoComponent, FormsModule, FormularioContatoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  alfabeto: string = 'abcdefghijklmnopqrstwuvxyz';
  contatos: Contato[] = agenda;
  filtroPorTexto: string ="";


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
