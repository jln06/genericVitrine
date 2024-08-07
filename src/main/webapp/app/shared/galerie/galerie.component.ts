import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EditModeService } from '../../home/service/edit-mode.service';
import { forkJoin, Observable } from 'rxjs';
import { FileService } from '../../home/service/file.service';
import { FileHandle } from '../../entities/model/file-handle.model';
import { DataUtils } from '../util/data-util.service';
import { NgxGalleryAnimation, NgxGalleryComponent, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { CustomNgxGalleryImage } from '../../entities/model/customNgxGallery';
import { NgxGalleryAction } from '@kolkov/ngx-gallery/lib/ngx-gallery-action';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { scrollTo } from '../util/viewUtil';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../service/loader.service';

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
    private loaderService: LoaderService
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
        thumbnailsColumns: 6,
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
      this.recupererGallerie2();
    });
  }

  recupererGallerie2() {
    this.fileService.recupererGalerieFiles().subscribe(data => {
      this.loaderService.setLoading(true);
      if (data.length > 0) {
        const galleryImages: CustomNgxGalleryImage[] = [];
        const fileHandleTemp: FileHandle[] = [];
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
      this.loaderService.setLoading(false);
    });
  }

  deleteImage(event, index): void {
    const ngbModalRef = this.modalService.open(ConfirmDialogComponent, { ariaLabelledBy: 'modal-basic-title' });
    ngbModalRef.componentInstance.confirmText = 'Etes vous sur de vouloir supprimer cette image ?';
    ngbModalRef.result
      .then(result => {
        const ids: number[] = [this.galleryImages[index]?.idPhoto];
        this.loaderService.setLoading(true);
        this.fileService.deletePhoto(ids).subscribe(() => {
          this.recupererGallerie2();
          this.ngxgallery.show(index - 1);
        });
      })
      .finally(() => {
        scrollTo('galerie');
        this.loaderService.setLoading(false);
      });
  }
}
