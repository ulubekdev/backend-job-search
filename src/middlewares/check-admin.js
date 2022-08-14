import { AuthorizationError, InternalServerError } from "../utils/errors.js";

export default async(req, res, next) => {
    try {
        const [ User ] = await req.models.User.findAll({ where: { user_id: req.userId } });
        let { dataValues } = User;
        if (dataValues.role !== 'admin') {
            return next(new AuthorizationError(401, "Invalid token"));
        }
        return next();
    } catch (error) {
        return next(new InternalServerError(401, error.message));
    }
};