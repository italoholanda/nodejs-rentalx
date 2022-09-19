import Category from "../model/Category";

interface ICategoryDTO {
  name: string;
  description: string;
}

export default class CategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICategoryDTO) {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list() {
    return this.categories;
  }
}
