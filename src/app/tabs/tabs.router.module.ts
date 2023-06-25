import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'divulgar-obra',
        children: [
          {
            path: '',
            loadChildren: '../divulgar-obra/divulgar-obra.module#DivulgarObraPageModule'
          }
        ]
      },
      {
        path: 'mapa-obras',
        children: [
          {
            path: '',
            loadChildren: '../mapa-obras/mapa-obras.module#MapaObrasPageModule'
          }
        ]
      },
      {
        path: 'historico',
        children: [
          {
            path: '',
            loadChildren: '../historico/historico.module#HistoricoPageModule'
          }
        ]
      },
      {
        path: 'editar-perfil',
        children: [
          {
            path: '',
            loadChildren: '../editar-perfil/editar-perfil.module#EditarPerfilPageModule'
          }
        ]
      },
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: '../login/login.module#LoginPageModule'
          }
        ]
      },
      {
        path: 'registro',
        children: [
          {
            path: '',
            loadChildren: '../registro/registro.module#RegistroPageModule'
          }
        ]
      },
      {
        path: 'notificacoes',
        children: [
          {
            path: '',
            loadChildren: '../notificacoes/notificacoes.module#NotificacoesPageModule'
          }
        ]
      },
      {
        path: 'denuncia',
        children: [
          {
            path: '',
            loadChildren: '../denuncia/denuncia.module#DenunciaPageModule'
          }
        ]
      },
      {
        path: 'finalizer',
        children: [
          {
            path: '',
            loadChildren: '../finalizer/finalizer.module#FinalizerPageModule'
          }
        ]
      },
      {
        path: 'denuncias',
        children: [
          {
            path: '',
            loadChildren: '../denuncias-realizadas/denuncias-realizadas.module#DenunciasRealizadasPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
