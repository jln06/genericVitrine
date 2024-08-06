import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription.component';

const routes: Routes = [
  {
    path: '',
    component: InscriptionComponent,
    data: {
      pageTitle: 'inscription.title',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionRoutingModule {}
