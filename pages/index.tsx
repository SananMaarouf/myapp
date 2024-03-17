import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Product } from "./components/product";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

const inter = Inter({ subsets: ["latin"] });
type Product = {
  id: number;
  name: string;
  image: string;
  rating: number;
  updateProductRating: (id: number, rating: number) => void;
};


export async function getServerSideProps() {
  const products = await prisma.product.findMany();
  return {
    props: {
      initialProducts: products,
    },
  };
}



  
export default function Index({ initialProducts }: { initialProducts: Product[] }) {
  console.log(initialProducts);

  const [products, setProducts] = useState(initialProducts);

  const updateProductRatingState = async (id: number, newRating: number) => {
    setProducts(prevProducts => prevProducts.map(product => 
      product.id === id ? { ...product, rating: newRating } : product
      ));
  }

  const updateProductRating = async(id: number, newRating: number) =>{
    const response = await fetch(`/api/products`, {
      method: "PATCH",
      body: JSON.stringify({ id: id, rating: newRating }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
}
  return (
    <main className="flex flex-col p-24 bg-attensi">
      <section className="flex flex-col mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-800 italic">
          Supercool Products
        </h1>
        <section className="ml-4">
          <section className="mt-8">
            <h2 className="text-3xl font-bold text-gray-800">Category title</h2>
            <section className="flex flex-row flex-wrap">
              {products.map(product =>
                <Product image_url={`/assets/${product.image}`} key={product.id} {...product} updateProductRating={updateProductRating} updateProductRatingState={updateProductRatingState} />
              )}
            </section>
          </section>
          <section className="mt-8">
            <h2 className="text-3xl font-bold text-gray-800">Category title</h2>
            <section className="flex flex-row flex-wrap">
              {products.map(product =>
                <Product image_url={`/assets/${product.image}`} key={product.id} {...product} updateProductRating={updateProductRating} updateProductRatingState={updateProductRatingState} />
              )}
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}

