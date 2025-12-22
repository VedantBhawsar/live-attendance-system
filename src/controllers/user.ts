import type { Request, Response } from "express";
import { camparePassword, sendError, sendResponse, signJWT } from "../lib";
import { notFoundErrors, validationErrors } from "../contants";
import * as z from "zod";
import { createUserSchema, loginUserSchema } from "../validators";
import { User } from "../schemas";

export async function signupController(req: Request, res: Response) {
  const body = req.body();
  try {
    const { data, error } = createUserSchema.safeParse(body);
    if (!data) {
      return sendError(res, validationErrors.invalidRequest, 400);
    }

    const existUser = await User.findOne({ email: data.email });

    if (existUser) {
      return sendError(res, "Email already exists", 400);
    }

    let user = new User({
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role,
    });

    user = await user.save();

    sendResponse(
      res,
      {
        id: user._id,
        name: user.name,
        password: user.password,
        role: user.role,
      },
      201
    );
  } catch (error) {
    sendError(res, validationErrors.internalServerError);
  }
}

export async function loginController(req: Request, res: Response) {
  const body = req.body();
  try {
    const { data } = loginUserSchema.safeParse(body);
    if (!data) {
      return sendError(res, validationErrors.invalidRequest, 400);
    }

    const user = await User.findOne({ email: data.email });

    if (!user) {
      return sendError(res, notFoundErrors.user, 404);
    }

    const isMatch = await camparePassword(data.password, user.password);

    if (!isMatch) {
      return sendError(res, validationErrors.invalidEmailOrPassword, 400);
    }

    const token = signJWT(user._id, user.role);

    sendResponse(
      res,
      {
        token,
      },
      200
    );
  } catch (error) {
    sendError(res, validationErrors.internalServerError);
  }
}

export async function meController(req: Request, res: Response) {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return sendError(res, notFoundErrors.user, 404);
    }

    return sendResponse(
      res,
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      200
    );
  } catch (error) {
    return sendError(res, validationErrors.internalServerError);
  }
}
