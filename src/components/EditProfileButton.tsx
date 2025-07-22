"use client";

export function EditProfileButton() {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={() => window.location.href = "/profile/edit"}
    >
      Editar perfil
    </button>
  );
}