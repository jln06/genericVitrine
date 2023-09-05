import { SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  id?: number;
  file: File;
  url: SafeUrl;
  urlUnsafe: any;
  description?: string | null;
  prix?: string | null;
}
