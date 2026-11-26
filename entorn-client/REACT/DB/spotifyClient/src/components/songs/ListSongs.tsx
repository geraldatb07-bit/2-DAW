import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import SongRow from "./SongRow";
import type { SongListProps } from "./Types/SongListProps";


const ListSongs = (props: SongListProps) => {
    return (
    <>
        {
            props.tracks.map(
                (t: GETTrack) => {
                    return <SongRow onPlay={props.onPlayTrack ? () => props.onPlayTrack?.(t) : undefined}
                        id={t.id}
                        key={t.id}
                        title={t.title}
                        artist_name={t.artist}
                        artist_id={t.artist_id}
                        duration={t.duration}
                        edit = {props.edit}
                        delete = {props.delete}
                    />
                }
            ) 
        }
    </>
    )

}

export default ListSongs;