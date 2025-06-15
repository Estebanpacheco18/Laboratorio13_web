import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AdminPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  if (!session || session.user.role !== "admin") {
    return <p>Acceso denegado. Debes ser administrador.</p>;
  }

  const handleChangeRole = async () => {
    const res = await fetch("/api/set-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });
    if (res.ok) setMessage("Rol actualizado");
    else setMessage("Error al actualizar rol");
  };

  return (
    <div>
      <h1>Panel de Administración</h1>
      <input
        type="email"
        placeholder="Email del usuario"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <button onClick={handleChangeRole}>Cambiar Rol</button>
      <p>{message}</p>
    </div>
  );
}