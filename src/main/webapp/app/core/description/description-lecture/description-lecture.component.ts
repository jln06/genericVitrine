import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Description } from '../../../entities/model/description.model';
import { FileHandle } from '../../../entities/model/file-handle.model';

@Component({
  selector: 'jhi-description-lecture',
  templateUrl: './description-lecture.component.html',
  styleUrls: ['./description-lecture.component.scss'],
})
export class DescriptionLectureComponent implements OnInit {
  @Input()
  description: Description | undefined;
  @Input()
  photo: FileHandle;

  constructor() {}

  ngOnInit(): void {}

  readPhoto(): void {
    if (this.description.photo) {
      this.photo = this.description.photo;
    }
  }
}
