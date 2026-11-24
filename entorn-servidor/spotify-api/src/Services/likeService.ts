import sql, { ConnectionPool, IResult, UniqueIdentifier } from "mssql";
import { getConnection } from "../config/database";
import { createSuccessService } from "../interfaces/error/createSuccessService";
import { errorService } from "../interfaces/error/errorService";
import { LikeRequest } from "../interfaces/Likes/like";
import { isValidLike } from "../validators/likeValidator";
import { selectSuccessService } from "../interfaces/error/selectSuccesService";

export async function createLike(likeRequest: LikeRequest): Promise<createSuccessService | errorService> {
    if (!isValidLike(likeRequest)) {
        return { success: false, code: 400, message: "Invalid like data." };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText = `INSERT INTO Likes(id, user_id, track_id, [date], likeTrack) VALUES (NEWID(), @user_id, @track_id, SYSDATETIME(), @likeTrack)`;

    request.input("user_id", UniqueIdentifier, likeRequest.user_id);
    request.input("track_id", UniqueIdentifier, likeRequest.track_id);
    request.input("likeTrack", sql.Numeric, likeRequest.likeTrack);

    const result: IResult<number> = await request.query(queryText);

    return {
        success: true,
        code: 201,
        data: result.rowsAffected[0]
    };
}

export async function getLikes(trackId: string): Promise<selectSuccessService<number> | errorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("trackId", UniqueIdentifier, trackId);


    const result: IResult<{ totalLikes: number }> = await request.query(`
        SELECT SUM(likeTrack) AS totalLikes
        FROM Likes
        WHERE track_id = @trackId
        `);

    return {
        success: true,
        code: 200,
        data: result.recordset[0].totalLikes
    }
}
