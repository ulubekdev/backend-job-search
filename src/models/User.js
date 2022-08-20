import { DataTypes } from 'sequelize';

export default ({ sequelize }) => {
    sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        role: {
            type: DataTypes.ENUM('employer', 'admin'),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Email already exists'
            },
            validate: {
                isEmail: true
            }
        }
    }, {
        underscored: true,
        freeezTableName: true,
        tableName: 'users'
    });
};