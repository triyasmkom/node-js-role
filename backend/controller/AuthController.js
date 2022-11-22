import Users from "../models/UserModel.js";
import * as argon2 from "argon2";

export const Login = async (req, res)=>{
    const user = await Users.findOne({
        where:{
            email: req.body.email
        }
    });
    console.log("Login User: ", user);

    if (!user) return res.status(404).json({msg:"User tidak ditemukan"});
    // verify password
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({msg:"Wrong Password"});

    // set session
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    console.log("Session: ",req.session.userId );
    res.status(200).json({uuid, name, email, role});

}
// get user session
export const Me = async (req, res)=>{
    // jika tidak ada session
    if (!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda"});
    }
    console.log("Session Me: ", req.session.userId);
    // get user by uuid

    const userMe = await Users.findOne({ attributes:['name','uuid','email', 'role'],
        where:{
            uuid: req.session.userId
        }
    });
    console.log("User Me: ", userMe);
    if (!userMe) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(userMe);
}

export const Logout = (req, res)=>{
    req.session.destroy((err)=>{
        if (err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg:"Anda telah logout"});
    });
}