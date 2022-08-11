import { DataTypes } from 'sequelize';

export default ({ sequelize }) => {
    sequelize.define('Job', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        experience: {
            type: DataTypes.ENUM('0-1', '1-3', '3-5', '5+'),
            allowNull: true
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM('full-time', 'part-time', 'remote'),
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM('it', 'marketing', 'design', 'sales', 'finance', 'management', 'other'),
            allowNull: false
        },
        skills: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        requirements: {
            type: DataTypes.STRING,
            allowNull: true
        },
        time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.ENUM('active', 'closed'),
            defaultValue: 'active'
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        }
    }, {
        underscored: true,
        freeezTableName: true,
        tableName: 'users'
    });
};


