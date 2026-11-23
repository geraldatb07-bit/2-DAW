import { Artist } from "../interfaces/artist/artist";
import { MAXPSEUDONIM } from "../interfaces/artist/artist.constants";
import { MAXARTIST } from "../interfaces/track/track.constants";



export function isValidArtist(artist: Artist): boolean | string | undefined {
    let correcte: boolean = true;

    if (!artist.nom || !artist.pseudonim || !artist.pais_id) {
        return false
    }

    const longArtist: number = artist.nom.trim().replace(/\s+/g, "").length;
    const longPseudonim: number = artist.pseudonim.trim().replace(/\s+/g, "").length;

    const dadesOK: boolean = longArtist > 0
        && longArtist <= MAXARTIST
        && longPseudonim > 0
        && longPseudonim <= MAXPSEUDONIM

    if (!dadesOK) {
        return false;
    }

    return true;
}