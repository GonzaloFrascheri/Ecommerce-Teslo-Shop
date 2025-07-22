"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

import { useUIStore } from "@/store";
import { logout } from "@/actions";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-full sm:w-[400px] h-screen bg-white z-20 shadow-2xl rounded-lg transform transition-all duration-300 overflow-y-auto",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={40}
          className="absolute top-6 right-6 cursor-pointer"
          onClick={() => closeMenu()}
        />
        
        <div className="flex flex-col space-y-4 mt-10">
          {/* Links de categorías para mobile/tablet */}
          <div className="md:hidden">
            <Link
              href="/gender/men"
              onClick={closeMenu}
              className="flex items-center p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Hombres</span>
            </Link>
            <Link
              href="/gender/women"
              onClick={closeMenu}
              className="flex items-center p-2 mt-4 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Mujeres</span>
            </Link>
            <Link
              href="/gender/kid"
              onClick={closeMenu}
              className="flex items-center p-2 mt-4 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Niños</span>
            </Link>
          </div>

          {/* Separador */}
          <div className="w-full h-px bg-gray-200 my-5" />
          {/* Aquí van tus links y botones */}
          {isAuthenticated && (
            <>
              <Link
                href="/profile"
                onClick={() => closeMenu()}
                className="flex items-center p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPersonOutline size={30} />
                <span className="ml-3 text-xl">Perfil</span>
              </Link>

              <Link
                href="/orders"
                onClick={() => closeMenu()}
                className="flex items-center p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={30} />
                <span className="ml-3 text-xl">Ordenes</span>
              </Link>
            </>
          )}

          {isAuthenticated && (
            <button
              className="flex w-full items-center p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => logout()}
            >
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Salir</span>
            </button>
          )}

          {!isAuthenticated && (
            <Link
              href="/auth/login"
              className="flex items-center p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => closeMenu()}
            >
              <IoLogInOutline size={30} />
              <span className="ml-3 text-xl">Ingresar</span>
            </Link>
          )}

          {isAdmin && (
            <>
              {/* Line Separator */}
              <div className="w-full h-px bg-gray-200 my-10" />

              <Link
                href="/admin/products"
                onClick={() => closeMenu()}
                className="flex items-center p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoShirtOutline size={30} />
                <span className="ml-3 text-xl">Productos</span>
              </Link>

              <Link
                href="/admin/orders"
                onClick={() => closeMenu()}
                className="flex items-center p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={30} />
                <span className="ml-3 text-xl">Ordenes</span>
              </Link>

              <Link
                href="/admin/users"
                onClick={() => closeMenu()}
                className="flex items-center p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPeopleOutline size={30} />
                <span className="ml-3 text-xl">Usuarios</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};