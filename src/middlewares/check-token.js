import JWT from "../utils/jwt.js"

export default (req, res, next) => {
    try {
        const { token } = req.headers;
        const users = req.models.User.findAll(); 

        if (!token) {
            throw new Error(res, 403, "No token provided");
        }

        const { userId, agent } = JWT.verify(token);

        const reqAgent = req.headers['user-agent'];

        if (agent !== reqAgent) {
            throw new Error(res, 403, "Invalid token");
        }

        if(users.find(user => user.user_id == userId)) {
            throw new Error(res, 403, 'You are not authorized!')
        }
        
        req.userId = userId;

        return next();
    } catch (error) {
        throw new Error(res, 403, "Invalid token");
    }
}