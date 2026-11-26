import type { Playlist } from "../../../Model/Playlist";

export type PlaylistFormState =
    {mode: "none"} |
    {mode: "new"} |
    {
        mode: "edit";
        song: Playlist;
    }