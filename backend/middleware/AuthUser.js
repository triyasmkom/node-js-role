// untuk memproteksi endpoint

import Users from "../models/UserModel.js";

export const verifyUser = async (req, res, next)=>{
    // jika tidak ada session
    if (!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda"});
    }
    console.log("Session Me: ", req.session.userId);
    // get user by uuid

    const user = await Users.findOne({
        where:{
            uuid: req.session.userId
        }
    });
    console.log("User Me: ", user);
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    req.userId = user.id;
    req.role = user.role;
    next();
}

export const adminOnly = async (req, res, next)=>{
    // jika tidak ada session
    if (!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda"});
    }
    console.log("Session Me: ", req.session.userId);
    // get user by uuid

    const user = await Users.findOne({
        where:{
            uuid: req.session.userId
        }
    });
    console.log("User Me: ", user);
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if (user.role!=="admin") return res.status(403).json({msg: "Akses Terlarang"});
    next();
}

