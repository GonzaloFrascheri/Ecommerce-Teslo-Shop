'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";

export const getCategories = async() => {

    const session = await auth();

    if ( !session?.user ) {
        return {
          ok: false,
          message: 'Debe de estar autenticado'
        }
    }

    try {
        
        const categories = await prisma.category.findMany({
            orderBy: {
                name: "asc"
            }
        })

        return categories;

    } catch (error) {
        
        console.log(error)

        return{
            ok: false,
            message: 'No se pudieron obtener las categorias'
        }
    }
    

}