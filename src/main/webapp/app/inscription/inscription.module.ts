import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionRoutingModule } from './inscription-routing.module';
import { InscriptionComponent } from './inscription.component';
import { SharedModule } from '../shared/shared.module';
import { AdherentComponent } from './components/adherent/adherent.component';
import { ParentComponent } from './components/parent/parent.component';

@NgModule({
  declarations: [InscriptionComponent, AdherentComponent, ParentComponent],
  imports: [CommonModule, InscriptionRoutingModule, SharedModule],
})
export class InscriptionModule {}
