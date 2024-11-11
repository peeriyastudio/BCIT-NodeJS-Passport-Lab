import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { database, userModel } from '../../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    throw new Error("GitHub OAuth credentials are missing in environment variables.");
}

const githubStrategy:GitHubStrategy = new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
      passReqToCallback: true,
    },
    
    /* Fixed 😊 */
    async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
      console.log(profile);
      const user = {
        id: Number(profile.id),
        name: profile.username,
      }
      database.push(user);
      done(null, user);

      /////////////////// Github ID finder ///////////////////////

      // const githubId = profile.id.toString();
      // const user = {
      //   githubId,
      //   name: profile.username,
      // };
      // try {
      //   const userExist = userModel.findByGitHubId(githubId);

      //   if (!userExist) {
      //     const newUser = {
      //       id: database.length + 1,
      //       name: user.name,
      //       email: "",
      //       password: "",
      //       githubId: user.githubId,
      //     };

      //     database.push(newUser);
      //     return done(null, newUser);
      //   }

      //   return done(null, userExist);
      // }
      // catch (error) {
      //   console.error('Error during GitHub authentication:', error);
      //   return done(error);
      // }

      ///////////////////////////////////////////////////////////////////

    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;