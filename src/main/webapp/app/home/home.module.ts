import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { DescriptionLectureComponent } from './components/description/description-lecture/description-lecture.component';
import { DescriptionEcritureComponent } from './components/description/description-ecriture/description-ecriture.component';
import { DescriptionComponent } from './components/description/description.component';
import { ContactComponent } from './components/contact/contact.component';

import { BanniereComponent } from '../core/banniere/banniere.component';
import { InscriptionDescriptionComponent } from './components/inscription/inscription-description/inscription-description.component';
import { InscriptionLectureComponent } from './components/inscription/inscription-description/inscription-lecture/inscription-lecture.component';
import { InscriptionEcritureComponent } from './components/inscription/inscription-description/inscription-ecriture/inscription-ecriture.component';
import { GoodiesComponent } from './components/goodies/goodies.component';
import { CreateGoodiesDialogComponent } from './components/goodies/create-goodies-dialog/create-goodies-dialog.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { InscriptionDetailComponent } from './components/inscription/inscription-detail.component';

@NgModule({
  imports: [SharedModule, CKEditorModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [
    HomeComponent,
    DescriptionLectureComponent,
    DescriptionEcritureComponent,
    DescriptionComponent,
    ContactComponent,
    InscriptionDetailComponent,
    BanniereComponent,
    InscriptionDescriptionComponent,
    InscriptionLectureComponent,
    InscriptionEcritureComponent,
    GoodiesComponent,
    CreateGoodiesDialogComponent,
  ],
})
export class HomeModule {}
