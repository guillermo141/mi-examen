// Tipos de datos usados en toda la aplicación.

export interface AveResumen {
  id: number;
  nombreComun: string | null;
  nombreCientifico: string;
  foto: string | null;
}

export interface AveDetalle extends AveResumen {
  reino: string | null;
  clase: string | null;
  orden: string | null;
  familia: string | null;
  genero: string | null;
  estadoConservacion: string | null;
  resumenWikipedia: string | null;
  wikipediaUrl: string | null;
}