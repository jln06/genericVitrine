import { Component, OnInit, SecurityContext } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import { ContactService } from '../../service/contact.service';
import { AlertService } from '../../../shared/util/alert.service';

@Component({
  selector: 'jhi-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  formData: FormGroup;
  formDataSubmitted = false;

  constructor(
    private formbuilder: FormBuilder,
    private contactService: ContactService,
    private alertService: AlertService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formData = this.formbuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10,14}$')]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    });
  }

  onSubmit(value: any): void {
    this.formDataSubmitted = true;
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }
    this.contactService
      .contacter({
        nom: value.nom,
        prenom: value.prenom,
        email: value.email,
        telephone: value.telephone,
        message: value.message.replaceAll('\n', '<br>'),
      })
      .subscribe(
        () => {
          this.alertService.successAlert('Merci, votre message a bien été envoyé');
          this.formData.reset();
          this.formDataSubmitted = false;
        },
        () => this.alertService.errorAlert("Une erreur est survenue lors de l'envoi de votre message")
      );
  }

  get nom(): AbstractControl | null {
    return this.formData.get('nom');
  }

  get prenom(): AbstractControl | null {
    return this.formData.get('prenom');
  }

  get telephone(): AbstractControl | null {
    return this.formData.get('telephone');
  }

  get email(): AbstractControl | null {
    return this.formData.get('email');
  }

  get message(): AbstractControl | null {
    return this.formData.get('message');
  }
}
