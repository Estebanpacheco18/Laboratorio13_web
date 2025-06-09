import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p>No tienes acceso. Inicia sesión.</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>
        Bienvenido,{" "}
        {session.user.username
          ? session.user.username
          : session.user.name}
      </h1>
      <p>Email: {session.user.email}</p>
      <img src={session.user.image} alt="Foto de perfil" width={100} />
      <br />
      <button onClick={() => signOut()}>Cerrar Sesión</button>
    </div>
  );
}