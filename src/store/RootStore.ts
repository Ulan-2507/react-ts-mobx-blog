import ArticleStore from "./ArticleStore";
import UserStore from "./UserStore";

export class RootStore {
  articleStore: ArticleStore;
  userStore: UserStore;

  constructor() {
    this.articleStore = new ArticleStore();
    this.userStore = new UserStore();
  }
}
