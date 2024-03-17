// Import necessary modules and components
import { useState } from "react";
import { Product } from "./components/product";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the type for a product
type Product = {
  id: number;
  name: string;
  image: string;
  rating: number;
  updateProductRating: (id: number, rating: number) => void;
};

// This function runs on the server before the page is rendered.
// It fetches the list of products from the database using Prisma.
export async function getServerSideProps() {
  const products = await prisma.product.findMany();
  return {
    props: {
      initialProducts: products,
    },
  };
}  

// This is the main component for the index page.
// It receives the initial list of products as a prop.
export default function Index({ initialProducts }: { initialProducts: Product[] }) {
  // Log the initial products to the console
  console.log(initialProducts);

  // Initialize state for the products
  const [products, setProducts] = useState(initialProducts);

  // This function updates the rating of a product.
  // It first updates the state, then sends a PATCH request to the server.
  const updateProductRating = async (id: number, newRating: number) => {
    // Update the state
    setProducts(prevProducts => prevProducts.map(product => 
      product.id === id ? { ...product, rating: newRating } : product
      ));

    // Send a PATCH request to the server
    const response = await fetch(`/api/products`, {
      method: "PATCH",
      body: JSON.stringify({ id: id, rating: newRating }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  }

  // Render the page
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
              {/* Map over the products and render a Product component for each one */}
              {products.map(product =>
                <Product image_url={`/assets/${product.image}`} key={product.id} {...product} updateProductRating={updateProductRating}  />
              )}
            </section>
          </section>
          <section className="mt-8">
            <h2 className="text-3xl font-bold text-gray-800">Category title</h2>
            <section className="flex flex-row flex-wrap">
              {/* Map over the products and render a Product component for each one */}
              {products.map(product =>
                <Product image_url={`/assets/${product.image}`} key={product.id} {...product} updateProductRating={updateProductRating} />
              )}
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}