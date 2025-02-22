const UserModel = require("../Models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) =>{
    try{
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email})
        if(user){
            return res.status(409).json({message: 'user exist, you can login', success: false})
        }
        const userModel = new UserModel({name, email, password})
        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save();
        res.status(201).json({message: "signup success", success: true})
    }catch(err){
        res.status(500).json({
            message: "interval server error",
            success: false
        })
    }
}
const login = async (req, res) =>{
    try{
        const { email, password} = req.body;
        const user = await UserModel.findOne({email})
        const errorMsg = 'Auth failed email or passsword is wrong'
        if(!user){
            return res.status(403).json({message: errorMsg, success: false})
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403).json({message: errorMsg, success: false})
        }
        const jwtToken = jwt.sign({email:user.email, _id: user._id },
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        res.status(200).json({message: "signup success", success: true, jwtToken, email, name: user.name })
    }catch(err){
        res.status(500).json({
            message: "interval server error",
            success: false
        })
    }
}

module.exports = {
    signup, login
}

// UserModel

// //signup
// const signup = async (req, res)=>{
//     try{
//     const {email, password, user} = req.body;
//         const user = await UserModel.findOne({email});
//         if(user){
//             res.send(409).json({message: "user exists, you can login",
//                                 success: false
//         })
//         }

//         const userModel = await UserModel({email, password, user})
//         userModel.password = await bcrypt.hash(password, 10);
//         await userModel.save();
//         res.send(201).json({message: "user created", success: true})
//     }catch(err){
//         res.send(500).json({message: "internal error", success: false})
//     }
// }

// const Login = async (req, res)=>{
//     try{
//     const {email, password, user} = req.body;
//         const user = await UserModel.findOne({email});
//         if(!user){
//             res.send(409).json({message: "user exists, you can login",
//                                 success: false
//         })
//         }
//         const checkPass = await bcrypt.compare(password, user.password)
//         if(!checkpass)

//         const jwtT = jwt.sign({email:user.email, _id: _id.password},
//             process.env., {}expireIn: '24h'
//         )
//         res.send(201).json({message: "user created", success: true})
//     }catch(err){
//         res.send(500).json({message: "internal error", success: false})
//     }
// }


