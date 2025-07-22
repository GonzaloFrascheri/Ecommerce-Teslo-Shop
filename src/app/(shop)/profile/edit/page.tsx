"use client";
import { useEffect, useState } from "react";

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llama a la API para obtener los datos actuales del usuario
    fetch("/api/profile", { method: "GET" })
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        setEmail(data.email);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ name, email }),
      headers: { "Content-Type": "application/json" },
    });
    window.location.href = "/profile";
  };

  if (loading) return <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">Cargando...</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 mb-32 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Editar perfil</h2>
      <label className="block mb-2 font-bold">Nombre</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className="mb-4 w-full p-2 border rounded"
        required
      />
      <label className="block mb-2 font-bold">Email</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="mb-4 w-full p-2 border rounded"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Guardar cambios
      </button>
    </form>
  );
}