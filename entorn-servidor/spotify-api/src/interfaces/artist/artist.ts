import { Country } from "../Country/country";

export interface Artist {
    nom: string;
    pseudonim: string;
    pais_id: string; //FK
}