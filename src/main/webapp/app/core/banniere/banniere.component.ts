import { Component, OnInit } from '@angular/core';
import { FileService } from '../service/file.service';
import { FileHandle } from '../../entities/model/file-handle.model';
import { DataUtils } from '../util/data-util.service';
import { EditModeService } from '../service/edit-mode.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-banniere',
  templateUrl: './banniere.component.html',
  styleUrls: ['./banniere.component.scss'],
})
export class BanniereComponent implements OnInit {
  banniere: FileHandle;
  editMode$: Observable<boolean>;

  constructor(private fileService: FileService, private dataUtils: DataUtils, private editModeService: EditModeService) {}

  ngOnInit(): void {
    this.editMode$ = this.editModeService.isEditMode$;
    this.fileService.recupererPhotoBanniere().subscribe(data => {
      if (data.length > 0) {
        this.banniere = this.dataUtils.fileDtoToFileHandle(data[0]);
      }
    });
  }

  onFileUploaded($event: FileHandle[]): void {
    this.banniere = $event[0];
    this.updatePhoto();
  }

  private updatePhoto() {
    this.fileService.addImage(this.banniere, 'BANNIERE').subscribe(file => (this.banniere = this.dataUtils.fileDtoToFileHandle(file[0])));
  }
}
