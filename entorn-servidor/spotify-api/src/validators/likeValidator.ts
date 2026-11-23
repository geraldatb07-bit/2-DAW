import { LikeRequest } from "../interfaces/Likes/like";


export function isValidLike(like: LikeRequest): boolean {
    if (!like) {
        return false;
    }

    if (!like.user_id || !like.track_id || (like.likeTrack !== 1 && like.likeTrack !== -1)) {
        return false
    }

    return true;

}