import type { Like } from "./likes";

export interface TrackView {
    id: string;
    title: string;
    artist: string;
    duration: number;
    reproduccions: number;
    likes: Like;
}