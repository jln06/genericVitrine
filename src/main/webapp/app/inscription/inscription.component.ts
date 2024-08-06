import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PieceJointeType } from '../enums/pieceJointeType';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UploadFileInscription } from '../entities/model/upload-file-inscription';
import { AlertService } from '../shared/util/alert.service';
import { InscriptionService } from '../shared/service/inscription.service';
import { scrollTo } from '../shared/util/viewUtil';
import { NgxSplideComponent } from 'ngx-splide';
import { ParentComponent } from './components/parent/parent.component';
import { catchError, tap } from 'rxjs/operators';
import { finalize, of } from 'rxjs';

@Component({
  selector: 'jhi-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('parent2') parent2!: ParentComponent;

  pieceJointeAssurance: File = null;
  pieceJointeCertificatMedical: File = null;
  items = [1, 2];
  inscriptionFormulaire: FormGroup;
  submitted$ = this.inscriptionService.submitted$;

  constructor(
    private alertService: AlertService,
    private inscriptionService: InscriptionService,
    private el: ElementRef,
    private fb: FormBuilder
  ) {}

  ngAfterViewInit(): void {
    this.adherentFormulaire.get('mineur').valueChanges.subscribe(value => {
      if (!value) {
        this.inscriptionFormulaire.setControl('parent1', this.fb.group({}));
        this.inscriptionFormulaire.setControl('parent2', this.fb.group({}));
      }
    });

    this.scrollToTop();
  }

  scrollToTop(): void {
    const element = document.getElementById('header');
    setTimeout(() => scrollTo('inscriptionFormulaireId', element.offsetHeight), 0);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  submit(): void {
    this.inscriptionService.flagSubmitForm();
    if (!this.verifyForm()) {
      return;
    }
    const formData = this.buildFormData();
    this.sendInscription(formData);
  }

  uploadFile(event: UploadFileInscription): void {
    if (event.pieceJointeType === PieceJointeType.ASSURANCE) {
      this.pieceJointeAssurance = event.file;
    } else if (event.pieceJointeType === PieceJointeType.CERTIFICAT_MEDICAL) {
      this.pieceJointeCertificatMedical = event.file;
    }
  }

  buildForm(): void {
    this.inscriptionFormulaire = this.fb.group({
      adherent: this.fb.group({}),
      parent1: this.fb.group({}),
      parent2: this.fb.group({}),
    });
  }

  buildFormData(): FormData {
    const requestData = this.buildRequest();
    const formData: FormData = new FormData();
    formData.append('certificatMedical', this.pieceJointeCertificatMedical, this.pieceJointeCertificatMedical.name);
    formData.append('assurance', this.pieceJointeAssurance, this.pieceJointeAssurance.name);
    formData.append(
      'inscription',
      new Blob([JSON.stringify(requestData)], {
        type: 'application/json',
      })
    );
    return formData;
  }

  buildRequest(): any {
    if (this.adherentFormulaire.get('mineur').value) {
      return {
        ...this.adherentFormulaire.value,
        parent1: this.parent1Formulaire.value,
        parent2: this.parent2.requiredChange ? this.parent2Formulaire.value : null,
      };
    } else {
      return {
        ...this.adherentFormulaire.value,
      };
    }
  }

  verifyForm(): boolean {
    if (this.inscriptionFormulaire.invalid) {
      this.inscriptionFormulaire.markAllAsTouched();
      this.scrollToFirstInvalidControl();
      return false;
    }
    if (this.pieceJointeAssurance == null || this.pieceJointeCertificatMedical == null) {
      return false;
    }
    return true;
  }

  scrollToFirstInvalidControl(): void {
    const form = document.getElementById('inscriptionFormulaireId');
    const firstInvalidControl = form.getElementsByClassName('ng-invalid')[0];
    const element = document.getElementById('header');
    scrollTo(firstInvalidControl.id, element.offsetHeight);
    (firstInvalidControl as HTMLElement).focus();
  }

  sendInscription(formData: FormData): void {
    this.inscriptionService
      .inscrire(formData)
      .pipe(
        tap(() => {
          this.alertService.successAlert('Merci, votre inscription a bien été enregistrée');
          this.resetForm();
          this.inscriptionService.resetSubmit();
        }),
        catchError(error => {
          this.alertService.errorAlert("Une erreur est survenue lors de l'envoi de votre inscription, veuillez réessayer ultérieurement");
          return of();
        })
      )
      .subscribe(() => this.scrollToTop());
  }

  resetForm(): void {
    this.inscriptionFormulaire.reset();
    this.pieceJointeAssurance = null;
    this.pieceJointeCertificatMedical = null;
  }

  get adherentFormulaire(): FormGroup {
    return this.inscriptionFormulaire.get('adherent') as FormGroup;
  }

  get parent1Formulaire(): FormGroup {
    return this.inscriptionFormulaire.get('parent1') as FormGroup;
  }

  get parent2Formulaire(): FormGroup {
    return this.inscriptionFormulaire.get('parent2') as FormGroup;
  }

  ngOnDestroy(): void {
    this.inscriptionService.resetSubmit();
  }

  protected readonly PieceJointeType = PieceJointeType;
}
