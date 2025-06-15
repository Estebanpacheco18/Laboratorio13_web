import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AdminPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  if (!session || session.user.role !== "admin") {
    return <p style={{ color: "red", textAlign: "center", marginTop: "50px" }}>Acceso denegado. Debes ser administrador.</p>;
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
    <div
      style={{
        maxWidth: "400px",
        margin: "60px auto",
        padding: "32px",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        background: "#fff",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "24px", color: "#222" }}>Panel de Administración</h1>
      <input
        type="email"
        placeholder="Email del usuario"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{
          width: "90%",
          padding: "10px",
          marginBottom: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <br />
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        style={{
          width: "95%",
          padding: "10px",
          marginBottom: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      >
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <br />
      <button
        onClick={handleChangeRole}
        style={{
          padding: "10px 30px",
          borderRadius: "6px",
          border: "none",
          background: "#0070f3",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Cambiar rol
      </button>
      <br />
      {message && <p style={{ marginTop: "16px", color: "#0070f3" }}>{message}</p>}
    </div>
  );
}