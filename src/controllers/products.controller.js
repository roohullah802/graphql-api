// import { throwGraphQLError } from "../error/error.js";
// import { Product } from "../model/product.model.js";
// import { GraphQLError } from "graphql";

// export async function getAllProducts() {
//   try {
//     const products = await Product.find();
//     if (!products.length === 0) {
//       throw new GraphQLError("Products not found", {
//         extensions: {
//           code: "NOT_FOUND",
//           http: { status: 404 },
//         },
//       });
//     }
//     return products;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getProductById(id) {
//   try {
//     const product = await Product.find({ id });
//     if (!product) {
//       throwGraphQLError("Product not found!", "NOT_FOUND", 404);
//     }
//     return product;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// export async function getProductByName(name, context) {
//   console.log(context);

//   try {
//     const product = await Product.find({ name });
//     if (!product) {
//       throwGraphQLError("Product not found!", "NOT_FOUND", 404);
//     }
//     return product;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// export async function updateProduct(data) {
//   try {
//     const product = await Product.find({ id: data?.id });

//     if (product.length === 0) {
//       throwGraphQLError("Product not found!", "NOT_FOUND", 404);
//     }

//     const updatedProduct = await Product.updateOne(
//       {
//         id: data.id,
//       },
//       {
//         name: data.name,
//         description: data.description,
//         price: data.price,
//       },
//     );

//     if (!updatedProduct) {
//       throwGraphQLError("Product update failed!", "UPDATE_FAIL", 400);
//     }

//     return "Product update successull";
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// export async function createProduct(data) {
//   try {
//     const { id, name, description, price } = data;
//     if (!id || !name || !description || !price) {
//       throw new Error("please provide required fields");
//     }

//     const existingProduct = await Product.findOne({ id });
//     console.log(existingProduct);

//     if (existingProduct) {
//       throwGraphQLError("Product Already exist", "EXISTS", 400);
//     }

//     const product = await Product.create({ id, name, description, price });
//     if (!product) {
//       throwGraphQLError("Product creation failed!", "CREATION_FAIL", 400);
//     }

//     return product;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
