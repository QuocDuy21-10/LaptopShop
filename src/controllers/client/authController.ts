import { Request, Response } from "express";
import { register } from "module";
import { registerNewUser } from "services/client/auth.service";
import { RegisterSchema } from "src/validation/register.schema";
const getLoginPage = async (req: Request, res: Response) => {
    return res.render('client/auth/login.ejs');
}

const getRegisterPage = async (req: Request, res: Response) => {
    const errors = [];
    const oldData = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    return res.render('client/auth/register.ejs', {
        errors,
        oldData
    });
}

const postRegister = async(req: Request, res: Response) => {
    const {fullName, email, password, confirmPassword} = req.body;
    const validate = await RegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
            const errorsZod = validate.error.issues;
            const errors = errorsZod.map(item => `${item.path[0]}: ${item.message}`);
            const oldData = {
                fullName,
                email,
                password,
                confirmPassword
            }
            return res.render('client/auth/register.ejs', {
                errors, oldData
            });
    }
    // success
    await registerNewUser(fullName, email, password);
    return res.render('client/auth/login.ejs'); 
}

export {getLoginPage, getRegisterPage, postRegister}