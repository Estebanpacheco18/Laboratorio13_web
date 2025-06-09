import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

// Se define aqui los emails de los administradores
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
      // Si el proveedor es GitHub, guarda el username
      if (account?.provider === "github" && profile?.login) {
        token.username = profile.login;
      }
      // Asigna rol basado en el email
      if (token.email && adminEmails.includes(token.email)) {
        token.role = "admin";
      } else {
        token.role = "user";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      // Si existe username, agrégalo a la sesión
      if (token.username) {
        session.user.username = token.username;
      }
      session.user.role = token.role;
      return session;
    },
  },
});