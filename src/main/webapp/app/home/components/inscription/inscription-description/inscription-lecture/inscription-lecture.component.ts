import { Component, Input, OnInit } from '@angular/core';
import { InscriptionDescription } from '../../../../../entities/model/inscription-description.model';

@Component({
  selector: 'jhi-inscription-lecture',
  templateUrl: './inscription-lecture.component.html',
  styleUrls: ['./inscription-lecture.component.scss'],
})
export class InscriptionLectureComponent implements OnInit {
  @Input()
  inscriptionDescription: InscriptionDescription;

  constructor() {}

  ngOnInit(): void {}
}
