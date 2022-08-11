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
            defaultValue: undefined
        },
        role: {
            type: DataTypes.ENUM('employee', 'employer'),
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