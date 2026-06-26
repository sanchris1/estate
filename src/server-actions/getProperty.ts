import { prisma } from "@/database/db";

export async function getProperty(propertyId: string) {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!property) return null;

    return property;
  } catch (error) {
    console.error(error);
    return null;
  }
}
