import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DenunciasRealizadasPage } from './denuncias-realizadas.page';

const routes: Routes = [
  {
    path: '',
    component: DenunciasRealizadasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DenunciasRealizadasPage]
})
export class DenunciasRealizadasPageModule {}
