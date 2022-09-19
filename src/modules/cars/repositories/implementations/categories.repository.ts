import Category from "../../model/Category";
import { ICategoryDTO, ICategoriesRepository } from "../ICategoriesRepository";

export default class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance() {
    if (!CategoriesRepository.INSTANCE)
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    return CategoriesRepository.INSTANCE;
  }

  findByName(name: string) {
    return this.categories.find(
      (category) => category.name.toLowerCase() === name.toLowerCase()
    );
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
