export interface LikeRequest {
    user_id: string;
    track_id: string;
    likeTrack: 1 | -1;
}