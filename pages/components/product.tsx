// Import necessary modules and components
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Define the Product type
// This type includes the product's id, name, image URL, rating, and a function to update the product's rating
type Product = {
    id: number;
    name: string;
    image_url: string;
    rating: number;

    updateProductRating: (id: number, rating: number) => void;
};

// This is the Product component.
// It receives a product object as a prop and renders the product's information.
// It also renders a row of stars for the product's rating, and allows the user to update the rating by clicking on a star.
export const Product = ({ id, name, image_url, rating, updateProductRating }: Product) => {

    return (
        <div className="w-44 h-62 mx-2 rounded-2xl flex flex-col text-center bg-white shadow-lg p-4 m-4 max-w-8xl px-4 text-black">
            <section className='flex flex-row self-end border rounded-full px-2'>
                <p>{rating}</p>
                <img src={"../assets/star_yellow.svg"} />
            </section>

            <div className="flex flex-wrap justify-center">
                <Image src={image_url} alt={name} width={150} height={150} className="m-2 w-full object-cover aspect-square rounded-full"
                />
            </div>
            <h2 className='text-sm font-bold mb-4 text-gray-700'>{name}</h2>
            <p className='text-md font-semibold text-gray-400'>select rating</p>
            <section className='flex flex-row justify-center'>
                {/* Map over an array of 5 elements to render the stars for the rating */}
                {[...Array(5)].map((_, i) => (
                    <div key={i} onClick={async () => {
                        // When a star is clicked, update the rating to the number of the star
                        const newRating = i + 1;
                        updateProductRating(id, newRating);
                    }}>
                    {/* If the star's number is less than the rating, render a yellow star. Otherwise, render a gray star. */}                    
                    <Image src={i < rating ? "/assets/star_yellow.svg" : "/assets/star_gray.svg"} alt="star" width={20} height={20}/>
                    </div>
                ))}
            </section>
        </div>
    );
}