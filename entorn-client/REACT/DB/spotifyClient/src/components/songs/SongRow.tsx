import type { Track } from "../../Model/Track";
import { formatDuration } from "../../Pages/Authenticated/Play";
import type { SongRowProps } from "./Types/SongRowProps";


const SongRow = (props: SongRowProps) => {
    function editar () {
        const song:Track = {
            id: props.id,
            title: props.title ,
            artist_name: props.artist_name,
            artist_id: props.artist_id,
            duration: props.duration
        }
        props.edit(song)
    }
    return (
        <tr>
            <td>Títol: {props.title}</td>
            <td>Artist: {props.artist_name}</td>
            <td>Duration: {formatDuration(props.duration)}</td>
            {props.onPlay && <td><button onClick={props.onPlay}>Play</button></td>}
            <td><button onClick={editar} >Edit</button></td>
        </tr>
    )
}

export default SongRow;