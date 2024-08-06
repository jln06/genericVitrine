import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FileService } from '../../home/service/file.service';
import { FileHandle } from '../../entities/model/file-handle.model';
import { DataUtils } from '../../shared/util/data-util.service';
import { EditModeService } from '../../home/service/edit-mode.service';
import { Observable } from 'rxjs';
import { NgxSplideComponent } from 'ngx-splide';

@Component({
  selector: 'jhi-banniere',
  templateUrl: './banniere.component.html',
  styleUrls: ['./banniere.component.scss'],
})
export class BanniereComponent implements OnInit {
  @ViewChild('splide') splide!: NgxSplideComponent;

  banniere: FileHandle;
  editMode$: Observable<boolean>;
  banniereList: FileHandle[] = [];

  constructor(
    private fileService: FileService,
    private dataUtils: DataUtils,
    private editModeService: EditModeService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.editMode$ = this.editModeService.isEditMode$;
    this.fileService.recupererPhotoBanniere().subscribe(data => {
      if (data.length > 0) {
        this.banniere = this.dataUtils.fileDtoToFileHandle(data[0]);
        this.banniereList.push(this.dataUtils.fileDtoToFileHandle(data[0]));
      }
    });
  }

  onFileUploaded($event: FileHandle[]): void {
    this.banniere = $event[0];
    this.updatePhoto();
  }

  private updatePhoto(): void {
    this.fileService.addImage(this.banniere, 'BANNIERE').subscribe(file => (this.banniere = this.dataUtils.fileDtoToFileHandle(file[0])));
  }
}
