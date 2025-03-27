import generateToken from "../utils/jwt.js";

export const register = async (req,res) => 
{
    try 
    {
        console.log(req.user);
        if(!req.user)
            return res.status(400).send("All fields are required");
        return res.status(201).json({message: `User created successfully`});
    } 
    catch(error) 
    {
        res.status(500).json({message: error});
    }
}

export const login = async (req,res) => 
{
    try 
    {
        if(!req.user._id)
            return res.status(400).json({message: "User name or password incorrect"});

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        };

        return res.status(200).cookie('ephemeralStore', generateToken(req.user), {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        }).json({message: "User logged in successfully"});
    }   
    catch(error) 
    {
        res.status(500).json({message: error});
    }
}

export const viewLogin = (req, res) => 
{
    res.status(200).render("templates/login",
    {
        main_css: "/css/_main.scss",
        current: 
        {
            title: "Log-in",
            css: "/css/_login.scss",
            js: "/js/login.js"
        }
    });
}

export const viewRegister = (req, res) => 
{
    res.status(200).render("templates/register",
    {
        main_css: "/css/_main.scss",
        current: 
        {
            title: "Sign-in",
            css: "/css/_register.scss",
            js: "/js/register.js"
        }
    });
}

/*
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
}*/