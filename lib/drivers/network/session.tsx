import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginUser } from '../../controllers/UserController';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(
        credentials,
        req /* eslint-disable-line*/
      ): Promise<User | null> {
        if (credentials) {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          const user = await loginUser(email, password);
          if (user._id) {
            return {
              id: user._id.toString(),
              name: user.email,
              email: user.email
            } as User;
          }
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return session;
  }

  res.status(401);
  res.end();
  return null;
};
