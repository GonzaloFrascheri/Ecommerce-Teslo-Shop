import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { Title } from "@/components";
import { EditProfileButton } from "@/components/EditProfileButton";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  // Traer datos del usuario y su dirección
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { address: { include: { country: true } } }
  });

  return (
    <div className="max-w-xl mx-auto mt-10 mb-32 p-6 bg-white rounded shadow">
      <Title title="Perfil" />
      {user?.image && (
        <div className="flex justify-center mb-6">
          <img src={user.image} alt="Avatar" className="w-24 h-24 rounded-full" />
        </div>
      )}
      <table className="min-w-full mt-6">
        <tbody>
          <tr>
            <td className="font-bold py-2">ID:</td>
            <td className="py-2">{user?.id}</td>
          </tr>
          <tr>
            <td className="font-bold py-2">Nombre:</td>
            <td className="py-2">{user?.name}</td>
          </tr>
          <tr>
            <td className="font-bold py-2">Email:</td>
            <td className="py-2">{user?.email}</td>
          </tr>
          <tr>
            <td className="font-bold py-2">Rol:</td>
            <td className="py-2 capitalize">{user?.role}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mt-8">
        <EditProfileButton />
      </div>
    </div>
  );
}