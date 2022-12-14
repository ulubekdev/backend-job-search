import JWT from '../utils/jwt.js';
import sha256 from 'sha256';
import { InternalServerError } from '../utils/errors.js';


const REGISTER = async (req, res, next) => {
    try {
        if(!(req.body.name && req.body.email && req.body.password && req.body.role)) {
            return res.status(400).send({
                status: 400,
                message: 'Please provide all required fields',
                token: null,
                data: null
            });
        }
        const oldUser = await req.models.User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (oldUser) {
            return res.status(409).json({
                status: 409,
                message: 'User already exists',
                token: null,
                data: null
            });
        }

        const user = await req.models.User.create({
            name: req.body.name,
            company: req.body.company,
            role: req.body.role,
            password: sha256(req.body.password),
            email: req.body.email,
        });
        const token = JWT.sign({ userId: user.user_id, agent: req.headers['user-agent'] });
        res.send({
            status: 201,
            message: 'User created successfully',
            data: user,
            token
        });
    } catch (error) {
        return next(new InternalServerError(500, error.message));
    }
};

const LOGIN = async (req, res, next) => {
    try {
        const user = await req.models.User.findOne({
            where: {
                email: req.body.email,
                password: sha256(req.body.password)
            }
        });
        if (!user) {
            return res.status(404).send({
                status: 404,
                message: 'User not found',
                token: null,
                data: null
            });
        }
        const token = JWT.sign({ userId: user.user_id, agent: req.headers['user-agent'] });
        res.send({
            status: 200,
            message: 'User logged in successfully',
            data: user,
            token
        });
    } catch (error) {
        return next(new InternalServerError(500, error.message));
    }
};

const GET_USERS = async (req, res, next) => {
    try {
        const users = await req.models.User.findAll();
        res.send({
            status: 200,
            message: 'Users fetched successfully',
            data: users
        });
    } catch (error) {
        return next(new InternalServerError(500, error.message));
    }
};

const UPDATE_USER = async (req, res, next) => {
    try {
        let { id } = req.params;
        id = parseInt(id); 

        const oldUser = await req.models.User.findOne({
            where: {
                user_id: id
            }
        });

        if(!oldUser) {
            return res.status(404).send({
                status: 404,
                message: 'User not found',
                token: null,
                data: null
            });
        }

        const user = await req.models.User.update(req.body, {
            where: {
                user_id: id
            }, 
            returning: true
        });
        
        res.status(200).send({
            status: 200,
            message: 'User updated successfully',
            data: user[1][0].dataValues
        });
    } catch (error) {
        return next(new InternalServerError(500, error.message));
    }
};

const DELETE_USER = async (req, res, next) => {
    try {
        let { id } = req.params;
        id = parseInt(id);

        const oldUser = await req.models.User.findOne({
            where: {
                user_id: id
            }
        });

        if(!oldUser) {
            return res.status(404).send({
                status: 404,
                message: 'User not found',
                token: null,
                data: null
            });
        }

        if(id === req.userId) {
            return next(new InternalServerError(500, 'You cannot delete yourself'));
        }

        const user = await req.models.User.destroy({
            where: {
                user_id: req.params.id
            },
            returning: true
        });

        if(!user) {
            return res.status(404).send({
                status: 404,
                message: 'User not found',
                token: null,
                data: null
            });
        }

        res.send({
            status: 200,
            message: 'User deleted successfully',
            data: oldUser
        });
    } catch (error) {
        return next(new InternalServerError(500, error.message));
    }
};
export default {
    REGISTER,
    LOGIN,
    GET_USERS,
    UPDATE_USER,
    DELETE_USER
}