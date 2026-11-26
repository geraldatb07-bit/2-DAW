import type { GETTrack } from "../../../APIManagement/Tracks/Interfaces/Track";
import type { Track } from "../../../Model/Track";

export interface SongListProps {
    tracks: GETTrack[];
    onPlayTrack?: (track: GETTrack) => void;
    edit?: (t:Track) => void;
    delete?: (id:string) => void;
}