import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ContainerComponent } from "./components/container/container.component";
import { CabecalhoComponent } from "./components/cabecalho/cabecalho.component";
import { SeparadorComponent } from "./components/separador/separador.component";
import { ContatoComponent } from "./components/contato/contato.component";
import { FormularioContatoComponent } from "./pages/formulario-contato/formulario-contato.component";
import { ListaContatosComponent } from "./pages/lista-contatos/lista-contatos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ContainerComponent, CabecalhoComponent, SeparadorComponent, ContatoComponent, FormsModule, FormularioContatoComponent, ListaContatosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

}
