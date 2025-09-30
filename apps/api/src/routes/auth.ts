import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { email, z } from "zod";
import argon2 from "argon2";

export const auth = Router();

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).max(128);
const nameSchema = z.string().min(2).max(100).optional();
const langSchema = z.enum(["en", "pl"]).optional();

function userToDTO(u: {
  id: string;
  email: string;
  name: string | null;
  role: string;
}) {
  return { id: u.id, email: u.email, name: u.name, role: u.role };
}

auth.post("/auth/register", async (req, res, next) => {
  try {
    const body = z
      .object({
        email: emailSchema,
        password: passwordSchema,
        name: nameSchema,
        lang: langSchema,
      })
      .parse(req.body);

    const exists = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (exists)
      return res
        .status(409)
        .json({ message: "User with this email already exists" });

    const passwordHash = await argon2.hash(body.password, {
      type: argon2.argon2id,
    });

    const user = await prisma.user.create({
      data: {
        email: body.email,
        passwordHash,
        name: body.name ?? null,
      },
      select: { id: true, email: true, name: true, role: true },
    });
    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.userId = user.id;
      req.session.role = user.role;
      res.status(201).json(userToDTO(user));
    });
  } catch (err) {
    next(err);
  }
});

auth.post("/auth/login", async (req, res, next) => {
  try {
    const body = z
      .object({
        email: emailSchema,
        password: passwordSchema,
      })
      .parse(req.body);

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const ok = await argon2.verify(user.passwordHash, body.password);
    if (!ok)
      return res.status(401).json({ message: "Invalid email or password" });

    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.userId = user.id;
      req.session.role = user.role;
      res.json(userToDTO(user));
    });
  } catch (err) {
    next(err);
  }
});

auth.post("/auth/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.status(204).end();
  });
});

auth.get("/auth/me", async (req, res, next) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { id: req.session.userId },
    select: { id: true, email: true, name: true, role: true },
  });
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  res.json(userToDTO(user));
});
