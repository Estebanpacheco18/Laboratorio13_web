import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Inicia sesión</h1>
      <button
        style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
        onClick={() => signIn("google")}
      >
        Iniciar sesión con Google
      </button>
      <br />
      <button
        style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
        onClick={() => signIn("github")}
      >
        Iniciar sesión con GitHub
      </button>
    </div>
  );
}