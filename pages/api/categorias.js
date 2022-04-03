import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// utilizamos eager loading para traer cada categoria con sus respectivos productos
export default async function handler(req, res) {
  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true,
    }
  });

  res.status(200).json(categorias)
}
