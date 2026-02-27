import { throwGraphQLError } from "../../lib/error/error.js";
import { User } from "../../model/user.model.js";
import { createHmac, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import { ImageModel } from "../../model/image.model.js";

class UserService {
  static async #generateHash(salt, password) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  static async getAllUsers() {
    return await User.find();
  }

  static async createUser(payload) {
    try {
      const existingUser = await User.findOne({ email: payload?.email });
      if (existingUser) {
        throwGraphQLError("User already exist", "EXIST", 400);
      }
      const { name, email, password } = payload;
      const salt = randomBytes(32).toString("hex");
      const hashedPassword = await UserService.#generateHash(salt, password);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        salt,
      });
      if (!newUser) {
        throwGraphQLError("User not created!", "CREATION_FAILED", 401);
      }
      return "User created successfully";
    } catch (error) {
      throw error;
    }
  }

  static async loginUser(payload, res) {
    try {
      const { email, password } = payload;

      if (!email || !password) {
        throwGraphQLError("Please enter required fields!");
      }

      const user = await User.findOne({ email });
      if (!user) {
        throwGraphQLError("User not found", "NOT_FOUND", 404);
      }

      const userHashedPassword = await UserService.#generateHash(
        user.salt,
        password,
      );
      if (userHashedPassword !== user.password) {
        throwGraphQLError("Invalid Credentials", "INVALID", 400);
      }

      const data = { id: user._id, email };
      const token = jwt.sign(data, process.env.JWT_SECRET);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: "/",
      });

      return token;
    } catch (error) {
      throw error;
    }
  }

  static async saveImage(file) {
    try {
      const { fileId, name, thumbnailUrl, fileType, height, width, url } = file;
      if (
        !fileId ||
        !name ||
        !thumbnailUrl ||
        !fileType ||
        !height ||
        !width ||
        !url
      ) {
        throwGraphQLError(
          "Please enter required fields!",
          "MISSING_FIELDS",
          400,
        );
      }
      const data = { name, url, thumbnailUrl, height, width, fileId, fileType };
      const resp = await ImageModel.create(data);

      if (!resp) {
        throwGraphQLError("Image not saved!", "ERROR", 400);
      }

      return {
        success: true,
        message: "Image saved successfully",
      };
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
