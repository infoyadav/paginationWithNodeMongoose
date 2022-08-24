const User = require("../models/user.models.js");

const createUser = async(req, res)=>{
    try {
        const { name, email, password, mobileNumber } = req.body;
        if(name && email && password && mobileNumber){
            try {
                const insertData = await User({
                    name: name,
                    email: email,
                    password: password,
                    mobileNumber: mobileNumber
                });
                await insertData.save()
                res.status(201).json({
                    status: "success",
                    message: "user registeration successfully ..."
                });
            } catch (error) {
                res.status(401).json({
                    status: "failed",
                    message: error.message
                });
            }
        }else{
            res.status(401).json({
                status: "failed",
                message: "All Fields are required"
            })
        }
    } catch (error) {
        res.status(401).json({
            status: "Failed",
            message: error.message
        });
    }
};

const getAllUser = async(req, res)=>{
    const { page = 1, limit = 10 } = req.query;
    try {
        const getUser = await User.find().limit(limit * 1).skip((page - 1) * limit).exec();
        res.status(200).json({
            status: "success",
            currentPage: page,
            totatUser: getUser.length,
            data: getUser
        });
    } catch (error) {
        res.status(401).json({
            status: "failed",
            message: error.message
        });
    }
}

// const getAllUser = async(req, res)=>{
//     const { page = 1, limit = 10 } = req.query;

//     const getUser = await User.find().then((getUser) => {
//         res.status(200).json({
//             status: "success",
//             currentPage: page,
//             totatUser: getUser.length,
//             data: getUser
//         }).limit(limit * 1)
//         .skip((page - 1) * limit)
//         .exec();

//     }).catch((err) => {
//         res.status(401).json({
//             status: "failed",
//             message: err.message
//         });
//     });
// }

module.exports = {
    createUser,
    getAllUser
}