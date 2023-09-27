import { MutationResolvers } from "__generated__/resolvers-types";

const mutations: MutationResolvers = {
  addBook: async (_, { title, author }, { dataSources }) => {
    const book = await dataSources.prisma.book.create({
      data: {
        title,
        author
      }
    });

    return {
      code: "200",
      message: "book created",
      success: true,
      book: book
    }
  },
};

export default mutations;
