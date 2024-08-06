import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { InscriptionService } from '../../../shared/service/inscription.service';

@Component({
  selector: 'jhi-adherent',
  templateUrl: './adherent.component.html',
  styleUrls: ['./adherent.component.scss'],
})
export class AdherentComponent implements OnInit {
  submitted$ = this.inscriptionService.submitted$;
  years: number[] = [];
  @Input()
  formAdherent: FormGroup;
  pieceJointeAssurance: File = null;
  pieceJointeCertificatMedical: File = null;

  constructor(private inscriptionService: InscriptionService) {}

  ngOnInit(): void {
    this.buildForm();
    this.initSelectYears();
    this.changeValidator();
  }

  getStartDate(): { year: number; month: number; day: number } {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 6);
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }

  buildForm(): void {
    this.formAdherent.addControl('mineur', new FormControl(true));
    this.formAdherent.addControl('nom', new FormControl(null, Validators.required));
    this.formAdherent.addControl('prenom', new FormControl(null, Validators.required));
    this.formAdherent.addControl('dateNaissance', new FormControl(null, Validators.required));
    this.formAdherent.addControl('adresse', new FormControl(null, [Validators.required, Validators.maxLength(150)]));
    this.formAdherent.addControl(
      'codePostal',
      new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5), Validators.maxLength(5)])
    );
    this.formAdherent.addControl('ville', new FormControl(null, [Validators.required, Validators.maxLength(50)]));
    this.formAdherent.addControl('email', new FormControl(null));
    this.formAdherent.addControl('portLunette', new FormControl(false, Validators.required));
    this.formAdherent.addControl('numeroUrgence', new FormControl(null, Validators.required));
    this.formAdherent.addControl('telephone', new FormControl(null));
    this.formAdherent.addControl('allergie', new FormControl(false, Validators.required));
    this.formAdherent.addControl('allergieType', new FormControl(null));
    this.formAdherent.addControl('santeAutre', new FormControl(null));
    this.formAdherent.addControl('UrgenceAutorise', new FormControl(true));
  }

  initSelectYears(): void {
    const currentYear: number = new Date().getFullYear();
    for (let i = currentYear - 60; i < currentYear - 6; i++) {
      this.years.push(i);
    }
  }

  get mineur(): AbstractControl | null {
    return this.formAdherent.get('mineur');
  }

  get nom(): AbstractControl | null {
    return this.formAdherent.get('nom');
  }

  get prenom(): AbstractControl | null {
    return this.formAdherent.get('prenom');
  }

  get dateNaissance(): AbstractControl | null {
    return this.formAdherent.get('dateNaissance');
  }

  get email(): AbstractControl | null {
    return this.formAdherent.get('email');
  }

  get telephone(): AbstractControl | null {
    return this.formAdherent.get('telephone');
  }

  get adresse(): AbstractControl | null {
    return this.formAdherent.get('adresse');
  }

  get codePostal(): AbstractControl | null {
    return this.formAdherent.get('codePostal');
  }

  get ville(): AbstractControl | null {
    return this.formAdherent.get('ville');
  }

  get numeroUrgence(): AbstractControl | null {
    return this.formAdherent.get('numeroUrgence');
  }

  get portLunette(): AbstractControl | null {
    return this.formAdherent.get('portLunette');
  }

  get allergie(): AbstractControl | null {
    return this.formAdherent.get('allergie');
  }

  get allergieType(): AbstractControl | null {
    return this.formAdherent.get('allergieType');
  }

  get santeAutre(): AbstractControl | null {
    return this.formAdherent.get('santeAutre');
  }

  get UrgenceAutorise(): AbstractControl | null {
    return this.formAdherent.get('UrgenceAutorise');
  }

  addControlMineur(mineur: boolean): void {
    const emailValidators = mineur ? [] : [Validators.required, Validators.email];
    const telephoneValidators = mineur ? [] : [Validators.required];
    this.email.setValidators(emailValidators);
    this.telephone.setValidators(telephoneValidators);
    this.email.setValue(null);
    this.telephone.setValue(null);
    this.email.updateValueAndValidity();
    this.telephone.updateValueAndValidity();
  }

  addControlAllergie(allergie: boolean): void {
    const allergieValidators = allergie ? [Validators.required] : [];
    this.allergieType.setValidators(allergieValidators);
    this.allergieType.setValue(null);
    this.allergieType.updateValueAndValidity();
  }

  changeValidator(): void {
    this.mineur.valueChanges.subscribe(value => {
      this.addControlMineur(value);
    });
    this.allergie.valueChanges.subscribe(value => {
      this.addControlAllergie(value);
    });
  }
}
