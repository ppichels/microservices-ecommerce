import { User } from "@repo/product-db";
import { Request, Response } from "express";
import { prisma } from "@repo/product-db";
import { generateAccessToken, generateRefreshToken } from "../../../lib/jwt";

type UserData = Omit<User, "id" | "createdAt" | "deletedAt" | "updatedAt">;

const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body as UserData;

  try {
    const user = await prisma.user.create({ data: { email, name, password } });
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({
      user,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export default register;
