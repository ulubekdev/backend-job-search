import JWT from '../utils/jwt.js';
import sha256 from 'sha256';

const REGISTER = async (req, res) => {
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
};

const LOGIN = async (req, res) => {
    const user = await req.models.User.findOne({
        where: {
            email: req.body.email,
            password: sha256(req.body.password)
        }
    });
    if (!user) {
        throw new Error(res, 403, 'Invalid credentials');
    }
    const token = JWT.sign({ userId: user.user_id, agent: req.headers['user-agent'] });
    res.send({
        status: 200,
        message: 'User logged in successfully',
        data: user,
        token
    });
};

const GET_USERS = async (req, res) => {
    const users = await req.models.User.findAll();
    res.send({
        status: 200,
        message: 'Users fetched successfully',
        data: users
    });
};

const UPDATE_USER = async (req, res) => {
    const user = await req.models.User.update(req.body, {
        where: {
            user_id: req.params.id
        }
    });
    res.send({
        status: 200,
        message: 'User updated successfully',
        data: user
    });
};

const DELETE_USER = async (req, res) => {
    const user = await req.models.User.destroy({
        where: {
            user_id: req.params.id
        }
    });
    res.send({
        status: 200,
        message: 'User deleted successfully',
        data: user
    });
};
export default {
    REGISTER,
    LOGIN,
    GET_USERS,
    UPDATE_USER,
    DELETE_USER
}