import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PATCH') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const productData = JSON.parse(req.body);

    const savedProduct = await prisma.product.update({
        where: { id: Number(productData.id) },
        data: {
            rating: productData.rating,
        },
    });
    res.json(savedProduct);
}