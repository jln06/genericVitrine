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

  ngOnInit(): void {
    // this.readPhoto();
  }

  readPhoto(): void {
    if (this.description.photo) {
      this.photo = this.description.photo;
    }
  }

  //pour la DB
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngChanges de lecture');
    // this.readPhoto();
    //   if (this.description.photo) {
    //     const reader = new FileReader();
    //     reader.onload = (e: any) => {
    //       console.log(e.target.result);
    //       this.preview = e.target.result;
    //     };
    // //changer type en File au lieu de FileHandler
    //     reader.readAsDataURL(this.description.photo);
    //   }
  }
}
