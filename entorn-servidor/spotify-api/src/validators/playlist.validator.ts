import { Playlist } from "../interfaces/Playlist/playlist";

export function isValidPlaylist(p: Playlist): boolean | string | undefined {
    if (!p || !p.title || !p.user_id) {
        return false;
    }
    return true;
}
