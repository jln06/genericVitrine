import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../service/contact.service';
import { Contact } from '../../entities/model/contact.model';
import { AlertService } from '../util/alert.service';

@Component({
  selector: 'jhi-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  formData: FormGroup;

  constructor(private formbuilder: FormBuilder, private contactService: ContactService, private alertService: AlertService) {}

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
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }
    this.contactService.contacter(value as Contact).subscribe(
      () => {
        this.alertService.addAlert({
          type: 'success',
          message: 'Message envoyé',
        });
        // this.formData.reset();
        scrollTo(0, 0);
      },
      () =>
        this.alertService.addAlert({
          type: 'danger',
          message: "Erreur lors de l'envoi du message",
        })
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
