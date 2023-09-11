import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EditModeService } from '../../core/service/edit-mode.service';
import { forkJoin, Observable } from 'rxjs';
import { FileService } from '../../core/service/file.service';
import { FileHandle } from '../../entities/model/file-handle.model';
import { DataUtils } from '../../core/util/data-util.service';
import { NgxGalleryAnimation, NgxGalleryComponent, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { CustomNgxGalleryImage } from '../../entities/model/customNgxGallery';
import { NgxGalleryAction } from '@kolkov/ngx-gallery/lib/ngx-gallery-action';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { scrollTo } from '../../core/util/viewUtil';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.scss'],
})
export class GalerieComponent implements OnInit, AfterViewInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: CustomNgxGalleryImage[];
  @ViewChild('ngxgallery') ngxgallery: NgxGalleryComponent;

  @Input()
  singleMode: boolean;
  filesH: FileHandle[] = [];

  isEditMode$: Observable<boolean>;

  constructor(
    private editModeService: EditModeService,
    private fileService: FileService,
    private dataUtils: DataUtils,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.isEditMode$ = this.editModeService.isEditMode$;
    this.initOptionGallery();
    this.recupererGallerie2();
  }

  ngAfterViewInit(): void {
    this.isEditMode$.subscribe(value => {
      this.ngxgallery.thumbnails.actions = this.determineThumbNailAction(value);
    });
  }

  private initOptionGallery() {
    this.galleryOptions = [...this.getGalleryOption()];
  }

  private determineThumbNailAction(actionAdd: boolean): NgxGalleryAction[] {
    return actionAdd
      ? [
          {
            icon: 'fa fa-times-circle',
            onClick: this.deleteImage.bind(this),
            titleText: 'delete',
          },
        ]
      : [];
  }

  private getGalleryOption(): NgxGalleryOptions[] {
    return [
      {
        width: '100%',
        height: '800px',
        thumbnailsColumns: 8,
        imageDescription: true,
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnailsSwipe: true,
        thumbnailsPercent: 20,
        thumbnailsMoveSize: 1,
        thumbnailsArrowsAutoHide: true,
        thumbnailClasses: ['thumbnail'],
        thumbnailActions: [...this.determineThumbNailAction(this.editModeService.getUpdateValue())],
        thumbnailSize: NgxGalleryImageSize.Cover,
      },
      // max-width 800
      {
        breakpoint: 992,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsColumns: 4,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 768,
        preview: false,
        thumbnailsColumns: 2,
      },
    ];
  }

  onFileUploaded($event: FileHandle[]) {
    const observables = $event.filter(file => file.id == null).map(file => this.fileService.addImage(file, 'GALERIE'));
    forkJoin(observables).subscribe(() => {
      // Toutes les observables sont terminées ici
      this.recupererGallerie2();
    });
  }

  recupererGallerie2() {
    this.fileService.recupererGalerieFiles().subscribe(data => {
      if (data.length > 0) {
        let galleryImages: CustomNgxGalleryImage[] = [];
        let fileHandleTemp: FileHandle[] = [];
        data.forEach(fileDto => fileHandleTemp.push(this.dataUtils.fileDtoToFileHandle(fileDto)));
        fileHandleTemp.forEach(f => {
          galleryImages.push({
            big: f.urlUnsafe,
            small: f.urlUnsafe,
            medium: f.urlUnsafe,
            type: f.file.type,
            idPhoto: f.id,
          });
        });
        this.galleryImages = galleryImages;
      }
    });
  }

  deleteImage(event, index): void {
    let ngbModalRef = this.modalService.open(ConfirmDialogComponent, { ariaLabelledBy: 'modal-basic-title' });
    ngbModalRef.componentInstance.confirmText = 'Etes vous sur de vouloir supprimer cette image ?';
    ngbModalRef.result
      .then(result => {
        const ids: number[] = [this.galleryImages[index]?.idPhoto];
        this.fileService.deletePhoto(ids).subscribe(() => {
          this.recupererGallerie2();
          this.ngxgallery.show(index - 1);
        });
      })
      .finally(() => scrollTo('galerie'));
  }
}
