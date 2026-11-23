import { Router } from "express";
import { getLikesController, postLikeController } from "../controllers/likeController";

export const likeRouter: Router = Router();

likeRouter.post("/", postLikeController);
likeRouter.get("/:trackId", getLikesController);