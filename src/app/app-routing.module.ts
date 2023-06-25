import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'modalpreviewfoto', loadChildren: './modalpreviewfoto/modalpreviewfoto.module#ModalpreviewfotoPageModule' },
  { path: 'modalfotoobra', loadChildren: './modalfotoobra/modalfotoobra.module#ModalfotoobraPageModule' },
  { path: 'info-obras/:idObra', loadChildren: './info-obras/info-obras.module#InfoObrasPageModule' },
  { path: 'fazer-denuncia/:idObra', loadChildren: './fazer-denuncia/fazer-denuncia.module#FazerDenunciaPageModule' },
  { path: 'registrar-termino/:idObra', loadChildren: './registrar-termino/registrar-termino.module#RegistrarTerminoPageModule' },
  { path: 'denuncias-realizadas', loadChildren: './denuncias-realizadas/denuncias-realizadas.module#DenunciasRealizadasPageModule' },
  { path: 'modal-foto-denuncia', loadChildren: './modal-foto-denuncia/modal-foto-denuncia.module#ModalFotoDenunciaPageModule' },
  { path: 'info-denuncia/:idDenuncia', loadChildren: './info-denuncia/info-denuncia.module#InfoDenunciaPageModule' },
 /* { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'editar-perfil', loadChildren: './editar-perfil/editar-perfil.module#EditarPerfilPageModule' },*/

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
