import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = getUserByEmailIdAndPassword(email, password);
    if (user) {
      done(null, user);
    } else {
      done(null, false, {
        message: "Your login details are not valid. Please try again",
      });
    }
  }
);

/* Fixed 😊 */
passport.serializeUser(function (user: Express.User, done: (err: any, id?: number) => void) {
  done(null, user.id);
});

/* Fixed 😊 */
// Passing "id" from serializeUser
passport.deserializeUser(function (id: number, done: (err: any, user?: Express.User | false | null) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user); // update req.user
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
