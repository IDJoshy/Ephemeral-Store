import jwt from "jsonwebtoken";
import _ from "mongoose-paginate-v2";

let secret = "ephemeralSecret";

const generateToken = (user) => 
{
    const token = jwt.sign({});
    return token;
}

export default generateToken;