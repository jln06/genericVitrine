import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InscriptionService } from '../../../shared/service/inscription.service';
import { Description } from '../../../entities/model/description.model';
import { debounceTime, Observable } from 'rxjs';
import { Pair } from '../../../shared/model/pair';

@Component({
  selector: 'jhi-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit, AfterViewInit {
  @Input()
  formParent: FormGroup;
  @Input()
  index: number;
  @Input()
  mineur: boolean;
  @Input()
  required: boolean;

  requiredChange: boolean;

  submitted$ = this.inscriptionService.submitted$;
  situationsFamiliales$: Observable<Pair<string, string>[]>;

  constructor(private inscriptionService: InscriptionService) {}

  ngOnInit(): void {
    this.situationsFamiliales$ = this.inscriptionService.getSituationsFamiliale();
    this.buildForm();
  }

  ngAfterViewInit(): void {
    this.isParentRequired();
  }

  isParentRequired(): void {
    this.formParent.valueChanges.pipe(debounceTime(1500)).subscribe(val => {
      if (!this.required) {
        const isAnyFieldFilled = Object.values(this.formParent.value).some(value => value !== null && value !== '');
        if (isAnyFieldFilled) {
          this.addRequiredValidators();
        } else {
          this.removeRequiredValidators();
        }
        this.nom.updateValueAndValidity({ emitEvent: false });
        this.prenom.updateValueAndValidity({ emitEvent: false });
        this.email.updateValueAndValidity({ emitEvent: false });
        this.telephone.updateValueAndValidity({ emitEvent: false });
        this.adresse.updateValueAndValidity({ emitEvent: false });
        this.codePostal.updateValueAndValidity({ emitEvent: false });
        this.ville.updateValueAndValidity({ emitEvent: false });
        this.situationFamiliale.updateValueAndValidity({ emitEvent: false });
      }
    });
  }

  buildForm(): void {
    this.addControls();
  }

  addControls(): void {
    this.formParent.addControl('nom', new FormControl(null));
    this.formParent.addControl('prenom', new FormControl(null));
    this.formParent.addControl('email', new FormControl(null, [Validators.email])); // Email always needs email validator
    this.formParent.addControl('telephone', new FormControl(null));
    this.formParent.addControl('adresse', new FormControl(null, [Validators.maxLength(150)]));
    this.formParent.addControl(
      'codePostal',
      new FormControl(null, [Validators.pattern('^[0-9]*$'), Validators.minLength(5), Validators.maxLength(5)])
    );
    this.formParent.addControl('ville', new FormControl(null, [Validators.maxLength(50)]));
    this.formParent.addControl('situationFamiliale', new FormControl(null));
    if (this.required) {
      this.addRequiredValidators();
    } else {
      this.removeRequiredValidators();
    }
  }

  addRequiredValidators(): void {
    this.formParent.get('nom').setValidators([Validators.required]);
    this.formParent.get('prenom').setValidators([Validators.required]);
    this.formParent.get('email').addValidators(Validators.required);
    this.formParent.get('telephone').setValidators([Validators.required]);
    this.formParent.get('adresse').addValidators(Validators.required);
    this.formParent.get('codePostal').addValidators(Validators.required);
    this.formParent.get('ville').addValidators(Validators.required);
    this.formParent.get('situationFamiliale').setValidators([Validators.required]);
    this.requiredChange = true;
  }

  removeRequiredValidators(): void {
    this.formParent.get('nom').clearValidators();
    this.formParent.get('prenom').clearValidators();
    this.formParent.get('email').removeValidators(Validators.required);
    this.formParent.get('telephone').clearValidators();
    this.formParent.get('adresse').removeValidators(Validators.required);
    this.formParent.get('codePostal').removeValidators(Validators.required);
    this.formParent.get('ville').removeValidators(Validators.required);
    this.formParent.get('situationFamiliale').clearValidators();
    this.requiredChange = false;
  }

  get nom(): AbstractControl | null {
    return this.formParent.get('nom');
  }

  get prenom(): AbstractControl | null {
    return this.formParent.get('prenom');
  }

  get email(): AbstractControl | null {
    return this.formParent.get('email');
  }

  get telephone(): AbstractControl | null {
    return this.formParent.get('telephone');
  }

  get adresse(): AbstractControl | null {
    return this.formParent.get('adresse');
  }

  get codePostal(): AbstractControl | null {
    return this.formParent.get('codePostal');
  }

  get ville(): AbstractControl | null {
    return this.formParent.get('ville');
  }

  get situationFamiliale(): AbstractControl | null {
    return this.formParent.get('situationFamiliale');
  }
}
