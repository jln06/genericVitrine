import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscriptionService } from '../../shared/service/inscription.service';
import { Inscription } from '../../entities/model/inscription.model';

@Component({
  selector: 'jhi-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
