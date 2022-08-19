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

const CREATE_JOB = async (req, res, next) => {
    try {
        const {
            title,
            company,
            description,
            location,
            experience,
            salary,
            type,
            category,
            skills,
            requirements,
            status
        } = req.body;

        if(!title || !company || !description || !location || !type || !category) {
            return res.status(400).send({
                status: 400,
                message: 'Please fill all required fields',
                data: null
            });
        }

        const job = await req.models.Job.create({
            title, company, description, location, experience, salary, type, category, skills, requirements, status
        });
        res.send({
            status: 201,
            message: 'Job created successfully',
            data: job
        });
    } catch (error) {
        return next(new InternalServerError(500, error.message));
    }

};


export default {
    GET_JOBS,
    CREATE_JOB
}