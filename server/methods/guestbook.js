const Post = require('../models').Post;
const User = require('../models').User;

module.exports = {
    create: async (text, userId) => {
        try {
            const user = await User.findOne({
                where: {
                    id: userId
                }
            });
            if (user) {
                await Post.create({text, userId})
                return await Post.findAll({
                    limit: 5,
                    order: [['createdAt', 'DESC']],
                    include: [{
                        model:User,
                        attributes: ["username"],
                        required: true
                    }]
                });
            }
            else return {error: "User now found"}
        } catch(error){
            return error;
        }
    },
    select: async (personal, userId) => {
        try{
            if(!personal){
                let records =  await Post.findAll({
                    order: [['createdAt', 'DESC']],
                    include: [{
                        model:User,
                        attributes: ["username"],
                        required: true
                    }]
                });
                return records ? records : [];
            } else {
                let records = await User.findOne({
                    where: {
                        username: userId
                    },
                    order: [['createdAt', 'DESC']],
                    include: [{
                        model: Post,
                        as: "posts",
                        required: true
                    }]
                });
                return records ? records.dataValues.posts : [];
            }
        } catch (error) {
            return error;
        }
    },
    deleteReq: async (id) => {
        try{
            const record = await Post.findByPk(id);
            if(record){
                await record.destroy();
                return true;
            }
            return record;
        } catch (error) {
            return error
        }
    }
};