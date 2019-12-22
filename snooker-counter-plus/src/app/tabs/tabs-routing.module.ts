import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'play-tab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../play-tab/play-tab.module').then(m => m.PlayTabModule)
          }
        ]
      },
      {
        path: 'rules-tab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../rules-tab/rules-tab.module').then(m => m.RulesTabModule)
          }
        ]
      },
      {
        path: 'records-tab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../records-tab/records-tab.module').then(m => m.RecordsTabModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/play-tab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/play-tab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
