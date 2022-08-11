export default (req, res, next) => {
    try {
        const checkAdmin = req.models.User.findAll({ where: { user_id: req.userId } });
        if (checkAdmin.role !== 'admin') {
            throw new Error(res, 403, 'You are not authorized!')
        }
        return next();
    } catch (error) {
        throw new Error(res, 403, "Invalid token");
    }
};