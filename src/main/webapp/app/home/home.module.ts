import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { DescriptionLectureComponent } from '../core/description/description-lecture/description-lecture.component';
import { DescriptionEcritureComponent } from '../core/description/description-ecriture/description-ecriture.component';
import { ContactComponent } from '../core/contact/contact.component';
import { InscriptionComponent } from '../core/inscription/inscription.component';
import { DescriptionComponent } from '../core/description/description.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BanniereComponent } from '../core/banniere/banniere.component';
import { InscriptionFormComponent } from '../core/inscription/inscription-form/inscription-form.component';
import { InscriptionDescriptionComponent } from '../core/inscription/inscription-description/inscription-description.component';
import { InscriptionLectureComponent } from '../core/inscription/inscription-description/inscription-lecture/inscription-lecture.component';
import { InscriptionEcritureComponent } from '../core/inscription/inscription-description/inscription-ecriture/inscription-ecriture.component';
import { GoodiesComponent } from '../core/goodies/goodies.component';
import { CreateGoodiesDialogComponent } from '../core/goodies/create-goodies-dialog/create-goodies-dialog.component';

@NgModule({
  imports: [SharedModule, CKEditorModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [
    HomeComponent,
    DescriptionLectureComponent,
    DescriptionEcritureComponent,
    DescriptionComponent,
    ContactComponent,
    InscriptionComponent,
    BanniereComponent,
    InscriptionFormComponent,
    InscriptionDescriptionComponent,
    InscriptionLectureComponent,
    InscriptionEcritureComponent,
    GoodiesComponent,
    CreateGoodiesDialogComponent,
  ],
})
export class HomeModule {}
