import userModel from "../models/userModels.js"

export const getUsers = async (req,res) => 
{
    try 
    {
        const users = await userModel.find();
        res.status(200).send(users);
    } 
    catch(error) 
    {
        res.status(500).send(error);
    }
}

export const getUser = async (req,res) => 
{
    try 
    {
        const userId = req.params.uid;
        const user = await userModel.findById(userId);
        if(user) 
        {
            res.status(200).send(user);
        } 
        else 
        {
            res.status(404).send("User not found");
        }

    } 
    catch(error) 
    {
        res.status(500).send(error);
    }
}

export const createUser = async (req,res) => 
{
    try 
    {
        const {first_name, last_name, email, password} = req.body;

        if(first_name == undefined || last_name == undefined || email == undefined || password == undefined) 
        {
            res.status(400).send("All fields are required");
        } 
        else 
        {
            let message = await userModel.create({first_name, last_name, email, password});
            res.status(201).send(message);
        }

      
    } 
    catch(error) 
    {
        res.status(500).send(error);
    }
}

export const updateUser = async (req,res) => 
{
    try 
    {
        const userId = req.params.uid;
        const {first_name, last_name, email, password} = req.body;
        const user = await userModel.findById(userId);
        if(user) 
        {
            await userModel.findByIdAndUpdate(userId, {first_name, last_name, email, password});
            res.status(200).send("User updated");
        }
        else 
        {
            res.status(404).send("User non-existent");
        }

    }
    catch(error) 
    {
        res.status(500).send(error);
    }
}

export const deleteUser = async (req,res) => 
{
    try 
    {
        const userId = req.params.uid;
        const user = await userModel.findById(userId);
        if(user) 
        {
            await userModel.findByIdAndDelete(userId);
            res.status(200).send("User deleted");
        }
        else 
        {
            res.status(404).send("User non-existent");
        }

    }
    catch(error) 
    {
        res.status(500).send(error);
    }
}