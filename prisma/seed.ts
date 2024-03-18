import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Define your products
  const products = [
    { name: "Banana Split", rating: 5, image: "banana.png" },
    { name: "Pointy Icicle", rating: 4, image: "strawberry_cone.png" },
    { name: "Fruit pop", rating: 5, image: "fruit_pop.png" },
    { name: "Strawberry Icecream", rating: 4, image: "strawberry_pop.png" },
  ];

  // Loop over each product
  for (const product of products) {
    // Check if the product already exists
    const existingProduct = await prisma.product.findUnique({
      where: { name: product.name },
    });

    // If the product doesn't exist, create it
    if (!existingProduct) {
      await prisma.product.create({ data: product });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });