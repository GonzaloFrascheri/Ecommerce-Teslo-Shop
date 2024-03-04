'use client' // Definición de 'use client': Porque cada vez que se monte este componente quiero hacer esta petición

import { getStockBySlug } from "@/actions"
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react"

interface Props{
    slug: string,
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getStock();
    }, [])
    
    const getStock = async() => {
        // TODO: llamar server actions
        const inStock = await getStockBySlug(slug);
        setStock(inStock);
        setIsLoading(false);        
    };

  return (
    <>
        {
            isLoading 
            ? (
                <h1 className={ ` ${ titleFont.className } antialiased font-bold text-lg bg-gray-200 animate-pulse` }>
                    &nbsp;
                </h1>
            ) : (
                <h1 className={ ` ${ titleFont.className } antialiased font-bold text-lg` }>
                    Stock: { stock }
                </h1>
            )
        }
    </>
  )
}