import type { PlaylistCreate } from "../../../APIManagement/Playlists/Interfaces/PlaylistCreate";
import type { Playlist } from "../../../Model/Playlist";

export interface addPlaylistFormProps {
    submit: (p: PlaylistCreate) => void;
    playlist?: Playlist;
}