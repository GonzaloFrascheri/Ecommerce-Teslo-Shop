'use server'

import prisma from "@/lib/prima";
// import { sleep } from "@/utils";


export const getStockBySlug = async( slug: string ): Promise<number> => {

    try {

        // await sleep(3);
        
        const stock = await prisma.product.findFirst({
            where: {
                slug
            },
            select: { inStock: true }
        });

        return stock?.inStock ?? 0;

    } catch (error) {

        throw new Error('No se pudo obtener el total de Stock de la BD');
    }
}