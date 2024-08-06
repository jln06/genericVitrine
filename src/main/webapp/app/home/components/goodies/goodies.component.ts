import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateGoodiesDialogComponent } from './create-goodies-dialog/create-goodies-dialog.component';
import { CustomNgxGalleryImage } from '../../../entities/model/customNgxGallery';
import { FileHandle } from '../../../entities/model/file-handle.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { FileService } from '../../service/file.service';
import { DataUtils } from '../../../shared/util/data-util.service';
import { EditModeService } from '../../service/edit-mode.service';

@Component({
  selector: 'jhi-goodies',
  templateUrl: './goodies.component.html',
  styleUrls: ['./goodies.component.scss'],
})
export class GoodiesComponent implements OnInit {
  isEditMode$: Observable<boolean>;

  goodies: FileHandle[] = [];

  option: any = {
    lazyLoad: 'nearby',
    preloadPages: 1,
    pauseOnHover: false,
    resetProgress: false,
    type: 'slide',
    arrows: true,
    pagination: false,
    rewind: false,
    autoplay: false,
    drag: true,
    gap: 15,
    breakpoints: {
      768: {
        perPage: 1,
        perMove: 1,
        padding: { left: 0, right: '20%' },
      },
      992: {
        perPage: 2,
        perMove: 2,
        padding: { left: 0, right: '20%' },
      },
      4000: {
        perPage: 4,
        perMove: 4,
        padding: { left: 0, right: 0 },
      },
    },
  };

  constructor(
    private fileService: FileService,
    private dataUtils: DataUtils,
    private editModeService: EditModeService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.isEditMode$ = this.editModeService.isEditMode$;
    this.recupererGoodies();
  }

  recupererGoodies(): void {
    this.fileService.recupererPhotoGoodies().subscribe(data => {
      if (data.length > 0) {
        let galleryImages: CustomNgxGalleryImage[] = [];
        let fileHandleTemp: FileHandle[] = [];
        data.forEach(fileDto => fileHandleTemp.push(this.dataUtils.fileDtoToFileHandle(fileDto)));
        this.goodies = fileHandleTemp;
      } else {
        this.goodies = [];
      }
    });
  }

  openModalGoodie(image?: FileHandle): void {
    const ngbModalRef = this.modalService.open(CreateGoodiesDialogComponent, { ariaLabelledBy: 'modal-basic-title' });
    let id = null;
    if (image) {
      ngbModalRef.componentInstance.filesHandle = image;
      id = image.id;
    }
    ngbModalRef.result.then(
      result => {
        if (result.image) {
          this.fileService.addImage(result.image, 'GOODIES', id, result.description, result.prix).subscribe(() => {
            this.recupererGoodies();
          });
        }
      },
      reason => {}
    );
  }

  createGoodie() {
    this.openModalGoodie();
  }

  editImage(image: FileHandle) {
    this.openModalGoodie(image);
  }

  deleteImage(image: FileHandle) {
    let ngbModalRef = this.modalService.open(ConfirmDialogComponent, { ariaLabelledBy: 'modal-basic-title' });
    ngbModalRef.componentInstance.confirmText = 'Etes vous sur de vouloir supprimer ce goodies ?';
    ngbModalRef.result.then(
      result => {
        const ids: number[] = [image.id];
        this.fileService.deletePhoto(ids).subscribe(() => {
          this.recupererGoodies();
        });
      },
      reason => {}
    );
  }
}
