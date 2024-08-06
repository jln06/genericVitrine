import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InscriptionService } from '../shared/service/inscription.service';
import { FileService } from '../home/service/file.service';
import { DataUtils } from '../shared/util/data-util.service';
import { FileHandle } from '../entities/model/file-handle.model';

@Component({
  selector: 'jhi-gallerie',
  templateUrl: './gallerie.component.html',
  styleUrls: ['./gallerie.component.scss'],
})
export class GallerieComponent implements OnInit {
  isLoading = false;
  items: string[] = [];
  currentPage = 0;
  itemsPerPage = 15;

  images: FileHandle[] = [];
  // Ajustez selon vos besoins
  hasMore = true;

  private totalItems = 100;

  toggleLoading = () => (this.isLoading = !this.isLoading);

  constructor(private fileService: FileService, private dataUtils: DataUtils) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages() {
    this.fileService
      .recupererGalerieFilesPageable(this.currentPage, this.itemsPerPage)
      .pipe(
        map(page => {
          page.content.forEach(fileDto => this.images.push(this.dataUtils.fileDtoToFileHandle(fileDto)));
          this.hasMore = !page.last;
          this.currentPage++;
        })
      )
      .subscribe();
  }

  onScroll() {
    if (this.hasMore) {
      this.loadImages();
    }
  }
}
