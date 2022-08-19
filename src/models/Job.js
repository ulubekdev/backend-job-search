import { DataTypes } from 'sequelize';

export default ({ sequelize }) => {
    sequelize.define('Job', {
        job_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1000),
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
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM('full-time', 'part-time', 'remote'),
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM('Programming', 'Marketing', 'Design', 'Salse', 'Finance', 'Managment', 'Others'),
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
        status: {
            type: DataTypes.ENUM('active', 'closed'),
            defaultValue: 'active'
        }
    }, {
        underscored: true,
        freeezTableName: true,
        tableName: 'jobs'
    });
};


