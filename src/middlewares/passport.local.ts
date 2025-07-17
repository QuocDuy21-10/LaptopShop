import passport from "passport";
import { Strategy as LocalStrategy} from "passport-local";
import bcrypt from "bcrypt";
import { prisma } from "config/client";
import { getUserById } from "services/user.service";
const configPassportLocal = () =>{
    passport.use(new LocalStrategy({ passReqToCallback: true }, async function verify(req, username, password, cb) {
    const { session } = req as any;

    if (session?.messages?.length) {
        session.messages = [];
    }
    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!user) {
        return cb(null, false, { message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return cb(null, false, { message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    return cb(null, user);
    }));

   passport.serializeUser(function (user: any, cb) {
            cb(null, { id: user.id, username: user.username });
    });

    passport.deserializeUser(async function (user: any, cb) {
        const { id, username } = user;
        // query to database 
        const userInDB = await getUserById(id);
        return cb(null, { ... userInDB});
    });
}
export default configPassportLocal