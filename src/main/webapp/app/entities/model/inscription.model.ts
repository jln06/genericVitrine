import { Parent } from './parent.model';

export interface Inscription {
  id?: number;
  nom: string;
  prenom: string;
  adresse: string;
  codePostal: string;
  ville: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  numeroUrgence: string;
  typeAllergie: string;
  santeAutre: string;
  paye: boolean;
  portLunette: boolean;
  allergie: boolean;
  contactUrgence: boolean;
  mineur: boolean;
  idAssurance: number;
  idCertificatMedical: number;
  parent1: Parent;
  parent2: Parent;
}
