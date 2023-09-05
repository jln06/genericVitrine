import { FileHandle } from './file-handle.model';

export interface Description {
  titreGauche: string;
  paragrapheGauche: string;
  titreDroit: string;
  paragrapheDroit: string;
  photo?: FileHandle;
}
