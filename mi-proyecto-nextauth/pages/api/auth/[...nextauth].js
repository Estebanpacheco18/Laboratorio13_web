import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { roles } from "../../../lib/roles"; // importa el objeto roles

// Aqui se puede definir los correos de administradores
const adminEmails = [
  "esteban.pacheco@tecsup.edu.pe",
  "otro.admin@gamil.com"
];

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "github" && profile?.login) {
        token.username = profile.login;
      }
      // Consulta el rol dinámico primero
      if (token.email && roles[token.email]) {
        token.role = roles[token.email];
      } else if (token.email && adminEmails.includes(token.email)) {
        token.role = "admin";
      } else {
        token.role = "user";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      if (token.username) {
        session.user.username = token.username;
      }
      session.user.role = token.role;
      return session;
    },
  },
});