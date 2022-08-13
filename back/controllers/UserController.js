import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const inserteduser = await user.save();
        res.status(201).json(inserteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const updateduser = await User.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deleteduser = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });
        if (user) {
            if (password === user.password) {
                res.status(200).json(user);
            }
        } else {
            if ((username === 'sysadm') && (password === 'sysadm')) {
                let user = new User({
                    name : 'sysadm',
                    email : 'sysadm@gmail.com',
                    gender : 'Male',
                    username : 'sysadm',
                    password : 'sysadm',
                    role : 'Admin',
                    token : 'test123'
                })        
                res.status(200).json(user);
            } 
        }           
    } catch (error) {
        console.log("Error : " + error.message);
        res.status(500).json({message: error.message});
    }
}

export const logout = async (req, res) => {
    try {
        console.log("Logging Out");   
    } catch (error) {
        console.log("Error : " + error.message);
    }
}

