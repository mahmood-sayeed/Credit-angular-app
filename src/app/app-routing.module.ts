import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './menu/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'card',
        loadChildren: () =>
            import('./card-details/card-details.module').then(m => m.CardDetailsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
