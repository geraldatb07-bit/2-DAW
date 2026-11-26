import type { PlaylistCreate } from "../../APIManagement/Playlists/Interfaces/PlaylistCreate";
import { GetIdUser } from "../../APIManagement/Users/userFunctions";
import type { addPlaylistFormProps } from "./Types/AddPlaylistFormProps"
import { type SubmitEvent } from "react";


const addPlaylistForm = (props: addPlaylistFormProps) => {

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const playlist: PlaylistCreate ={
            title: String(formData.get("title") ?? "").trim(),
            user_id: GetIdUser()
        }
        props.submit(playlist)
    }
    return (
        <>
            <h2>Afegir Playlist</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Títol:
                        <input 
                        type="text" 
                        name="title" 
                        defaultValue={props.playlist?.title}
                        required/>
                    </label>
                </p>
                <button type="submit">Desa</button>
            </form>
        </>
    )
}
export default addPlaylistForm;
