import { PieceJointeType } from '../../enums/pieceJointeType';

export interface UploadFileInscription {
  pieceJointeType: PieceJointeType;
  file: File;
}
