import { PostsService } from "./posts.service";

describe("PostsService", () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe(".findMany", () => {
    const posts = [
      { text: "Post 1" },
      { text: "Post 2" },
      { text: "Post 3" },
      { text: "Post 4" },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it("should return all posts if called without options", () => {
      expect(postsService.findMany()).toEqual([
        { text: "Post 1", id: "1" },
        { text: "Post 2", id: "2" },
        { text: "Post 3", id: "3" },
        { text: "Post 4", id: "4" },
      ]);
    });

    it("should return correct posts for skip and limit options", () => {
      expect(
        postsService.findMany({
          skip: 1,
          limit: 2,
        }),
      ).toEqual([
        { text: "Post 2", id: "2" },
        { text: "Post 3", id: "3" },
      ]);
    });

    it("should skip posts correctly", () => {
      expect(
        postsService.findMany({
          skip: 2,
        }),
      ).toEqual([
        { text: "Post 3", id: "3" },
        { text: "Post 4", id: "4" },
      ]);
    });

    it("should limit posts correctly", () => {
      expect(
        postsService.findMany({
          limit: 2,
        }),
      ).toEqual([
        { text: "Post 1", id: "1" },
        { text: "Post 2", id: "2" },
      ]);
    });

    it("should return empty array if skip is greater than posts length", () => {
      expect(
        postsService.findMany({
          skip: 10,
        }),
      ).toEqual([]);
    });
  });
});
