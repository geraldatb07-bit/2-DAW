import type { ArtistCreate } from "../../../APIManagement/Artists/Interfaces/ArtistCreate";
import type { Artist } from "../../../Model/Artists";

export interface AddArtistFormProps {
    submit: (a: ArtistCreate) => Promise<void>;
    artist?: Artist;
}