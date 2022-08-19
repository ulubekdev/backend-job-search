import { InternalServerError } from "../utils/errors.js";

const GET_JOBS = async (req, res, next) => {
    try {
        const jobs = await req.models.Job.findAll();
        res.send({
            status: 200,
            message: 'Jobs fetched successfully',
            data: jobs
        });
    } catch (error) {
        return next(new InternalServerError(500, error.message));
    }
};



export default {
    GET_JOBS
}