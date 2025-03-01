import { hashSync, compareSync } from "bcryptjs";

export const createHash = (password) => hashSync(password, 5);
export const validatePassword = (password, passwordBDD) => compareSync(password, passwordBDD);