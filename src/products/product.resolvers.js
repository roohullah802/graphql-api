import ProductService from "./service/product.service.js";

export const productResolvers = {
  Query: {
    getAllProducts: async () => await ProductService.getAllProducts(),
    getProductById: async (_, { id }) =>
      await ProductService.getProductById(id),
    getProductByName: async (_, { name }) =>
      await ProductService.getProductByName(name),
  },

  Mutation: {
    updateProduct: async (_, args) => await ProductService.updateProduct(args),
    createProduct: async (_, args) => await ProductService.createProduct(args),
  },
};
