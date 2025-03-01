import generateToken from "../utils/jwt.js";

export const register = async (req,res) => 
{
    try 
    {
        console.log(req.user);
        if(!req.user)
            return res.status(400).send("All fields are required");
        return res.status(201).send(`User created successfully with id: ${req.user?._id}`);
    } 
    catch(error) 
    {
        res.status(500).send(error);
    }
}

export const login = async (req,res) => 
{
    try 
    {
        if(!req.user._id)
            return res.status(400).send("User name or password incorrect");

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        };

        return res.status(200).cookie('ephemeralStore', generateToken(req.user), {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        }).send("User logged in successfully");
    }   
    catch(error) 
    {
        res.status(500).send(error);
    }
}

export const githubLogin = (req,res) =>{
    try 
    {
        if(!req.user) 
        {
            res.status(400).send("User already logged in");
        } 
        else 
        {
            req.session.user = {
                email: req.user.email,
                first_name: req.user.first_name
            };

            res.status(200).cookie('ephemeralStore',generateToken(req.user), {
                httpOnly: true,
                secure: false,
                maxAge: 86400000
            }).send("User logged in successfully");
        }
    }
    catch(error) 
    {
        res.status(500).send(error);
    }
}