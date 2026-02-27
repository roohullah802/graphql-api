export const productTypeDefs = `#graphql
type Product {
    id: ID!,
    name: String!,
    description: String!,
    price: Float!
}

type Query{
    getAllProducts: [Product],
    getProductById(id: ID!): Product,
    getProductByName(name: String!): [Product] 
}

type Mutation{
    updateProduct(id: ID!, name: String!, description:String, price: Float): String!,
    createProduct(id: ID!, name: String!, description: String!, price: Float!): Product!
}
`;
