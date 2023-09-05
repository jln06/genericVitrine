import { Route } from '@angular/router';
import { InscriptionListComponent } from './inscription-list.component';

export const inscritpionListRoute: Route = {
  path: '',
  component: InscriptionListComponent,
  data: {
    pageTitle: 'inscription.title',
    defaultSort: 'id,asc',
  },
};
