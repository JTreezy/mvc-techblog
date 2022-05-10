const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Blog = require('./Blog');
const User = require('./User');

class Comment extends Model {}

Comment.init({
    // add properites here, ex:
    body: {
        type:DataTypes.TEXT,
        allowNull:false,
        validate: {
            len: [1]
        }
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    user_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: User,
            key: 'id'
        }
    },
    blog_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: Blog,
            key: 'id'
        }
    }

},{
    sequelize
});

module.exports=Comment