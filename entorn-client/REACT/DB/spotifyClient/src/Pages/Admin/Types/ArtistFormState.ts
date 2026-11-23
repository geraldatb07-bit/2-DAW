import type { Artist } from "../../../Model/Artists";

export type ArtistFormState =
    { mode: "none" } |
    { mode: "new" } |
    {
        mode: "edit";
        artist: Artist;
    }