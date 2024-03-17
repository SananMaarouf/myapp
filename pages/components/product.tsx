import { useEffect, useState } from 'react';
import Image from 'next/image';

// Define the Product type
type Product = {
    id: number;
    name: string;
    image_url: string;
    rating: number;
    
    updateProductRating: (id: number, rating: number) => void;
};


export const Product = ({ id, name, image_url, rating, updateProductRating }: Product) => {

    return (
        <div className="w-44 h-62 mx-2 rounded-2xl flex flex-col text-center bg-white shadow-lg p-4 m-4 max-w-8xl px-4 text-black">
            <section className='flex flex-row self-end border rounded-full px-2'>
                <p>{rating}</p>
                <img src={"../assets/star_yellow.svg"} />
            </section>

            <div className="flex flex-wrap justify-center">
                <Image
                    src={image_url}
                    alt={name} width={150}
                    height={150}
                    className="m-2 w-full object-cover aspect-square rounded-full"
                />
            </div>
            <h2 className='text-sm font-bold mb-4 text-gray-700'>{name}</h2>
            <p className='text-md font-semibold text-gray-400'>select rating</p>
            <section className='flex flex-row justify-center'>
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        onClick={async () => {
                            const newRating = i + 1;
                            updateProductRating(id, newRating);
                        }}
                    >
                        <Image
                            src={i < rating ? "/assets/star_yellow.svg" : "/assets/star_gray.svg"}
                            alt="star"
                            width={20}
                            height={20}
                        />
                    </div>
                ))}
            </section>
        </div>
    );
}