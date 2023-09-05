import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { inscritpionListRoute } from '../inscription-list/inscription-list.route';
import { InscriptionListComponent } from './inscription-list.component';

@NgModule({
  declarations: [InscriptionListComponent],
  imports: [SharedModule, RouterModule.forChild([inscritpionListRoute])],
})
export class InscriptionListModule {}
