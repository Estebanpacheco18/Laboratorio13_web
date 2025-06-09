import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();

  if (!session || session.user.role !== "admin") {
    return <p>Acceso denegado. Debes ser administrador.</p>;
  }

  return <h1>Panel de Administración</h1>;
}