import { Component, OnInit } from '@angular/core';
import { EditModeService } from '../../service/edit-mode.service';
import { forkJoin, Observable } from 'rxjs';
import { VariableService } from '../../service/variable.service';
import { VariableComponentEnum } from '../../../enums/VariableComponentEnum';
import { InscriptionDescription } from '../../../entities/model/inscription-description.model';
import { Description } from '../../../entities/model/description.model';

@Component({
  selector: 'jhi-inscription-description',
  templateUrl: './inscription-description.component.html',
  styleUrls: ['./inscription-description.component.scss'],
})
export class InscriptionDescriptionComponent implements OnInit {
  editMode$: Observable<boolean>;
  inscriptionDescription: InscriptionDescription;

  constructor(private editService: EditModeService, private variableService: VariableService) {}

  ngOnInit(): void {
    this.editMode$ = this.editService.isEditMode$;
    this.initVariableInscription();
  }

  onChangeInscription($event: any) {
    console.log('Mise à jour de inscription');
    this.updateVariableInscription($event);
  }

  private updateVariableInscription(data: InscriptionDescription): void {
    forkJoin([
      this.variableService.updateVariable({
        code: VariableComponentEnum.TITRE_INSCRIPTION.toString(),
        valeur: data.titre,
      }),
      this.variableService.updateVariable({
        code: VariableComponentEnum.PARAGRAPHE_INSCRIPTION.toString(),
        valeur: data.description,
      }),
    ]).subscribe(() => {
      this.initVariableInscription();
      console.log('Upload des variables => ok');
    });
  }

  private initVariableInscription() {
    forkJoin([
      this.variableService.getVariable(VariableComponentEnum.TITRE_INSCRIPTION),
      this.variableService.getVariable(VariableComponentEnum.PARAGRAPHE_INSCRIPTION),
    ]).subscribe(([titre, paragraphe]) => {
      this.inscriptionDescription = {
        titre: titre.valeur,
        description: paragraphe.valeur,
      };
    });
  }
}
