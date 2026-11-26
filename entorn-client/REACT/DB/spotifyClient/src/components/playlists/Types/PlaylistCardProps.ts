import type { GETTrack } from "../../../APIManagement/Tracks/Interfaces/Track";

export interface PlaylistCardProps {
    onSelectPlaylist: (playlistId: string) => void;
    selectedPlaylistTitle: string;
    tracks: GETTrack[];
    onPlayTrack: (track: GETTrack) => void;
    onCreatePlaylist?: () => void;
}