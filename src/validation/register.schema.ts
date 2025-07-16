import { isEmailExist } from "services/client/auth.service";
import * as z from "zod"; 
const passwordSchema = 
        z.string()
        .min(3, { message: 'Mật khẩu tối thiểu 3 ký tự' })
        .max(20, { message: 'Mật khẩu tối đa 20 ký tự' })
        // .refine((password) => /[A-Z]/.test(password), {
        //     message: "Mật khẩu bao gồm ít nhất 1 ký tự viết hoa",
        // })
        // .refine((password) => /[a-z]/.test(password), {
        //     message: "Mật khẩu bao gồm ít nhất 1 ký tự viết thường",
        // })
        // .refine((password) => /[0-9]/.test(password), {
        //     message: "Mật khẩu bao gồm ít nhất 1 chữ số"
        // })
        // .refine((password) => /[!@#$%^&*]/.test(password), {
        //     message: "Mật khẩu bao gồm ít nhất 1 ký tự đặc biệt",
        // });

const emailSchema = z.string().email("Email không đúng định dạng")
                        // Kiểm tra xem email có tồn tại trong DB
                        .refine(async(email) => {
                            const existingUser = await isEmailExist(email);
                            return !existingUser;
                        }, {
                            // Nếu false thì ném ra trigger
                            message: "Email đã tồn tại",
                            path: ["email"]
                        });

export const RegisterSchema = z.object({
    fullName: z.string().trim().min(1, { message: 'Tên không được để trống' }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không chính xác",
        path: ["confirmPassword"]
    });

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
