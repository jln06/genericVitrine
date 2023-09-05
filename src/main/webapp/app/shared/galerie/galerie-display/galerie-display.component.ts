import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileHandle } from '../../../entities/model/file-handle.model';
import Splide from '@splidejs/splide';
import { FileService } from '../../../core/service/file.service';
import { FileDto } from '../../../entities/model/fileDto.model';
import { NgbCarousel, NgbCarouselConfig, NgbModal, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { EditModeService } from '../../../core/service/edit-mode.service';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component';
import { scrollTo } from '../../../core/util/viewUtil';

declare const $: any;

@Component({
  selector: 'jhi-galerie-display',
  templateUrl: './galerie-display.component.html',
  styleUrls: ['./galerie-display.component.scss'],
})
export class GalerieDisplayComponent implements OnInit {
  PRE_ID_ITEM = 'ngb-slide-';
  // _filesLink: FileDto[]
  _filesHandle: FileHandle[];
  activeSliderId;
  @Input()
  showCaption: boolean = false;
  @Input()
  showThumbnail: boolean = true;
  @Output() onDeleteFile: EventEmitter<FileHandle> = new EventEmitter<FileHandle>();

  editMode$: Observable<boolean>;

  @Input()
  set fileHandle(fileHandle: FileHandle[]) {
    if (fileHandle && fileHandle.length > 0) {
      console.log("j'init les fileHandle dans input");
      this._filesHandle = fileHandle;
      this.activeSliderId = this.PRE_ID_ITEM + this._filesHandle[0].id;
    }
  }

  constructor(config: NgbCarouselConfig, private editModeService: EditModeService, private modalService: NgbModal) {
    // customize default values of carousels used by this component tree
    config.interval = 0;
    config.keyboard = true;
  }

  ngOnInit(): void {
    this.editMode$ = this.editModeService.isEditMode$;
  }

  cycleToSlide(photo: any, carousel: NgbCarousel) {
    let slideId = photo.id;
    console.log('photo id ' + slideId);
    this.activeSliderId = this.PRE_ID_ITEM + slideId;
    console.log('je cycle sur ' + this.activeSliderId);
    carousel.select(this.PRE_ID_ITEM + slideId);
  }

  updateActiveSlideId($event: NgbSlideEvent) {
    console.log("j'update slide" + $event.current);
    let current = $event.current;
    this.activeSliderId = $event.current;
  }

  thumbnailSameImage(image: FileHandle) {
    return image.id == this.getIdNumberSlide(this.activeSliderId);
  }

  getIdNumberSlide(IDSlide) {
    const parties = IDSlide.split('-');
    if (parties.length > 1) {
      const dernierElement = parties.pop();
      return parseInt(dernierElement, 10);
    }
    return null;
  }

  deleteImage(image: FileHandle) {
    let ngbModalRef = this.modalService.open(ConfirmDialogComponent, { ariaLabelledBy: 'modal-basic-title' });
    ngbModalRef.componentInstance.confirmText = 'Etes vous sur de vouloir supprimer cette image ?';
    ngbModalRef.result
      .then(result => {
        this.onDeleteFile.emit(image);
      })
      .finally(() => scrollTo('galerie'));
  }

  addImage() {
    console.log("j'ajoute une image");
  }
}