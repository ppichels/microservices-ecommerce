import { User } from "@repo/product-db";
import { prisma } from "@repo/product-db";
import { generateAccessToken, generateRefreshToken } from "../../../lib/jwt";
import bcrypt from "bcrypt";
import { RegisterInput } from "./auth.schema";
import { Context } from "../../trpc/context";

type UserData = Omit<User, "id" | "createdAt" | "deletedAt" | "updatedAt">;

export const register = async (input: RegisterInput, ctx: Context) => {
  const { email, password, name }: UserData = input;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    ctx.res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    ctx.res.status(201).json({
      user,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    ctx.res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
