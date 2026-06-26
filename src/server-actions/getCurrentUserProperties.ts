import { getCurrentUser } from "./getCurrentUser";
import { prisma } from "@/database/db";

export async function getUserProperties() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const currentUserProperties = await prisma.property.findMany({
      where: {
        ownerId: currentUser.id,
      },
      orderBy: { createdAt: "desc" },
    });

    return currentUserProperties;
  } catch (error) {
    console.log("Error fetching the current user properties", error);
    return [];
  }
}
