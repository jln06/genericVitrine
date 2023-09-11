import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inscription } from '../../../entities/model/inscription.model';
import { InscriptionService } from '../../../shared/service/inscription.service';
import { AlertService } from '../../util/alert.service';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.scss'],
})
export class InscriptionFormComponent implements OnInit {
  years: number[] = [];
  formInscription: FormGroup;

  constructor(
    private fb: FormBuilder,
    private inscriptionService: InscriptionService,
    private alertService: AlertService,
    private config: NgbDatepickerConfig
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.initSelectYears();
  }

  getStartDate() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 6);
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }

  get nom(): AbstractControl | null {
    return this.formInscription.get('nom');
  }

  get prenom(): AbstractControl | null {
    return this.formInscription.get('prenom');
  }

  get dateNaissance(): AbstractControl | null {
    return this.formInscription.get('dateNaissance');
  }

  get email(): AbstractControl | null {
    return this.formInscription.get('email');
  }

  get telephone(): AbstractControl | null {
    return this.formInscription.get('telephone');
  }

  onSubmit(value: any): void {
    if (this.formInscription.invalid) {
      this.formInscription.markAllAsTouched();
      return;
    }
    let value1 = value as Inscription;
    this.inscriptionService.inscrire(value1).subscribe(
      () => {
        this.alertService.addAlert({
          type: 'success',
          timeout: 10000,
          message: 'Pré-inscription envoyée',
          position: 'top center',
        });
        this.formInscription.reset();
        scrollTo(0, 0);
      },
      () =>
        this.alertService.addAlert({
          type: 'danger',
          timeout: 10000,
          message: "Erreur lors de l'inscription",
        })
    );
  }

  buildForm(): void {
    this.formInscription = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]+$/)]],
    });
  }

  initSelectYears(): void {
    const currentYear: number = new Date().getFullYear();
    for (let i = currentYear - 60; i < currentYear - 6; i++) {
      this.years.push(i);
    }
  }
}
