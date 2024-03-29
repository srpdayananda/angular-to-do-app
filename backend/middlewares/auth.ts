import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../src/user/user.model';
import { TOKEN_KEY } from '../config/constant';

const auth = async (
    req: any,
    res: express.Response,
    next: express.NextFunction
) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res
            .status(403)
            .send({ success: false, error: "Authentication token is missing" });
    }

    try {
        const decoded: any = jwt.verify(token, TOKEN_KEY);
        req.user = decoded;

        const foundUser = await User.findById(decoded.userId);
        if (foundUser.accessToken !== token) {
            return res.status(401).send({ success: false, error: "JWT Invalid" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, error: "Jwt Expired" });
    }

    return next();
};

export default auth;