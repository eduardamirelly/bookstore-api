import { Category } from "@prisma/client";

export type CategoryType = Category;

export type CategoryCreation = Omit<CategoryType, "createdAt" | "updatedAt" | "id">;
