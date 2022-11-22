import Users from "../models/UserModel.js";
import User from "../models/UserModel.js"
import * as argon2 from "argon2";


export const getUsers= async (req, res)=>{
    try{
        const response = await User.findAll({attributes:['name','uuid','email', 'role']});
        console.log("Get All User: ", response);
        res.status(200).json(response);
    } catch (error){
        res.status(500).json({msg: error.message});
    }
}

export const getUsersById= async (req, res)=>{
    try{
        const response = await Users.findOne({attributes:['name','uuid','email', 'role']},
            {
            where:{uuid:req.params.id}
        });
        console.log("Get User by Id: ", response);
        res.status(200).json(response);

    }catch (error){
        res.status(500).json({msg:error.message});
    }
}

export const createUsers= async (req, res)=>{
    console.log("Req Create User: ", req.body);
    const {name, email, password, confirmPassword, role} = req.body;
    if (password!==confirmPassword) return res.status(400).json({msg:"Password and Confirm Password not matching"});
    const hashPassword = await argon2.hash(password);

    const user = await Users.findAll({where:{email}});
    if (user.length!==0) return res.status(400).json({msg:"Email is already..."});

    try {
        const user = await Users.create({
            name:name,
            email:email,
            password:hashPassword,
            role:role
        });
        console.log("Create User: ", user);
        res.status(201).json({msg:"Register Berhasil"});
    }catch (error){
        res.status(400).json({msg:error.message});
    }
}

export const updateUsers= async (req, res)=>{
    const user = await Users.findOne({
        where:{uuid: req.params.id}
    });
    // validasi user tidak ditemukan
    if (!user) return res.status(404).json({msg:"User tidak ditemukan"});

    const {name, email, password, confirmPassword, role} = req.body;

    // validasi password
    let hashPassword;
    console.log("pass: ", password==="","\npass: ", !password);
    if (password===""||!password){
        hashPassword = user.password;
    } else {
        hashPassword = await argon2.hash(password);
    }

    if (password!==confirmPassword) return res.status(400).json({msg:"Password and Confirm Password not matching"});

    try{
        await Users.update({
            name:name,
            email:email,
            password: hashPassword,
            role:role
        },{
            where:{
                id:user.id
            }
        });
        res.status(200).json({msg: "User updated"});

    }catch (error){
        res.status(400).json({msg:error.message});
    }
}

export const deleteUsers= async (req, res)=>{
    const user = await Users.findOne({
        where:{uuid: req.params.id}
    });
    // validasi user tidak ditemukan
    if (!user) return res.status(404).json({msg:"User tidak ditemukan"});

    try{
        await Users.destroy({
            where:{
                id:user.id
            }
        });
        res.status(200).json({msg: "User deleted"});

    }catch (error){
        res.status(400).json({msg:error.message});
    }
}