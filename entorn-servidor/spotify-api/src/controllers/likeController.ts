import { Request, Response } from "express";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";
import { LikeRequest } from "../interfaces/Likes/like";
import { createLike, getLikes } from "../Services/likeService";


export async function postLikeController(req: Request, res: Response): Promise<Response> {
    const result: createSuccessService | errorService = await createLike(req.body as LikeRequest);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}

export async function getLikesController(req: Request, res: Response): Promise<Response> {
    const result: selectSuccessService<number> | errorService = await getLikes(req.params.trackId as string);

    if (!result.success) {
        const errorResult = result as errorService;
        return res.status(errorResult.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}