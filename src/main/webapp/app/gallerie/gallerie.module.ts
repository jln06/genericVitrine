import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GallerieRoutingModule } from './gallerie-routing.module';
import { GallerieComponent } from './gallerie.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [GallerieComponent],
  imports: [CommonModule, GallerieRoutingModule, InfiniteScrollModule],
})
export class GallerieModule {}
