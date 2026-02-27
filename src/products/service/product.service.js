import { throwGraphQLError } from "../../lib/error/error.js";
import { Product } from "../../model/product.model.js";

class ProductService {
  static async createProduct(payload) {
    try {
      const { id, name, description, price } = payload;

      if (!name || !price) {
        throw new Error("please enter required fields");
      }

      const product = await Product.create({
        id,
        name,
        description,
        price,
      });

      if (!product) {
        throw new Error("product creation failed!");
      }

      return "Product has been created";
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(payload) {
    try {
      const { id, name, description, price } = payload;
      if (!id) {
        throw new Error("please provide id for find product");
      }

      const res = await Product.updateOne(
        { id },
        { id, name, description, price },
      );

      if (res.matchedCount === 0) {
        throw new Error("Product not updated");
      }

      return "Product has been updated";
    } catch (error) {
      throw error;
    }
  }

  static async getAllProducts() {
    return await Product.find();
  }

  static async getProductById(id) {
    try {
      const p = await Product.findOne({ id });

      if (!p) {
        throwGraphQLError("Product not found!", "NOT_FOUND", 404);
      }
      console.log("product => ", p);

      return p;
    } catch (error) {
      throw error;
    }
  }

  static async getProductByName(name) {
    try {
      const p = await Product.find({ name });
      if (!p.length === 0) {
        throwGraphQLError("Product not found!", "NOT_FOUND", 404);
      }

      return p;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
