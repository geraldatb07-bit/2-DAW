import type { Track } from "../../../Model/Track";

export type SongFormState =
    { mode: "none" } |
    { mode: "new" } |
    {
        mode: "edit";
        song: Track;
    }
