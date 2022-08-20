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

const UPDATE_JOB = async (req, res, next) => {
    try {
        let { id } = req.params;
        id = parseInt(id);

        const oldJob = await req.models.Job.findOne({
            where: {
                job_id: id
            }
        });

        if(!oldJob) {
            return res.status(404).send({
                status: 404,
                message: 'Job not found',
                data: null
            });
        }

        if(oldJob.status === 'closed') {
            return res.status(400).send({
                status: 400,
                message: 'Job is closed',
                data: null
            });
        }

        let job = await req.models.Job.update(req.body, {
            where: {
                job_id: id
            },
            returning: true
        });

        res.status(200).send({
            status: 200,
            message: 'Job updated successfully',
            data: job[1][0].dataValues
        });

    } catch (error) {
        return next(new InternalServerError(500, error.message));
    }
};

const DELETE_JOB = async (req, res, next) => {
    try {
        let { id } = req.params;
        id = parseInt(id);

        const oldJob = await req.models.Job.findOne({
            where: {
                job_id: id
            }
        });

        if(!oldJob) {
            return res.status(404).send({
                status: 404,
                message: 'Job not found',
                data: null
            });
        }
        await req.models.Job.destroy({
            where: {
                job_id: id
            }
        });
        res.status(200).send({
            status: 200,
            message: 'Job deleted successfully',
            data: oldJob
        });
    } catch (error) {
        return next(new InternalServerError(500, error.message));
    }
};

const GET_JOB_BY_TITLE = async (req, res, next) => {
    try {
        let { job_title } = req.params;

        let title = job_title.split('-')[0];
        let index = job_title.split('-')[1];

        const job = await req.models.Job.findOne({
            where: {
                job_id: index,
                title: title
            }
        });

        if(!job) {
            return res.status(404).send({
                status: 404,
                message: 'Job not found',
                data: null
            });
        }

        res.status(200).send({
            status: 200,
            message: 'Job fetched successfully',
            data: job
        });
    } catch (error) {
        return next(new InternalServerError(500, error.message));
    }
};

export default {
    GET_JOBS,
    CREATE_JOB,
    UPDATE_JOB,
    DELETE_JOB,
    GET_JOB_BY_TITLE
}