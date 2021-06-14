import { makeAutoObservable } from "mobx";
import {
  axiosApiInstance,
  getData,
  postFetch,
  putFetch,
} from "../services/apiServices";
import { ARTICLES } from "../services/CONSTANTS";
import { IArticle, ICreateArticle, IUpdateArticle } from "../types/article";

class ArticleStore {
  articles: IArticle[] = [];
  article: null | IArticle = null;
  page: number = 1;
  pageSize: number = 5;
  isLoading: boolean = false;
  error: null | string = null;
  isSending: boolean = false;
  success: boolean = false;
  isEdit: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  // setError(message: null | string) {
  //     this.error = message
  // }
  // loading(status: boolean) {
  //     this.isLoading = status
  //     this.error = null
  // }
  // sending(status: boolean) {
  //     this.isSending = status
  // }
  setSuccess(status: boolean) {
    this.success = status;
  }
  // setArticles(articles:IArticle[]) {
  //     this.articles = articles
  // }
  // setArticle(article: null | IArticle) {
  //     this.article = article
  // }
  setEdit(status: boolean) {
    this.isEdit = status;
  }
  setPage(page: number) {
    this.page = page;
  }
  setPageSize(size: number) {
    this.pageSize = size;
  }

  getArticles = async (pageSize: number, page: number): Promise<void> => {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await getData(
        `${ARTICLES}?limit=${pageSize}&offset=${pageSize * page}`
      );
      this.articles = response.articles;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  };

  getArticle = async (slug: string): Promise<void> => {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await getData(`${ARTICLES}/${slug}`);
      this.article = response.article;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  };

  createArticle = async (data: ICreateArticle): Promise<void> => {
    try {
      this.isSending = true;
      const response = await postFetch(`${ARTICLES}`, data);
      this.article = response.article;
      this.success = true;
      this.setEdit(false);
    } catch (error) {
      this.error = error.message;
    } finally {
      this.isSending = false;
    }
  };

  updateArticle = async (data: IUpdateArticle): Promise<void> => {
    try {
      this.isSending = true;
      const response = await putFetch(
        `${ARTICLES}/${this.article!.slug}`,
        data
      );
      this.article = response.article;
      this.success = true;
      this.setEdit(false);
    } catch (error) {
      this.error = error.message;
    } finally {
      this.isSending = false;
    }
  };

  deleteArticle = (slug: string): void => {
    axiosApiInstance.delete(`${ARTICLES}/${slug}`);
  };

  favorite = async (slug: string) => {
    try {
      const response = await axiosApiInstance.post(
        `${ARTICLES}/${slug}/favorite`
      );
      return response.data.article;
    } catch (error) {
      this.error = error.message;
    }
  };

  unfavorite = async (slug: string) => {
    try {
      const response = await axiosApiInstance.delete(
        `${ARTICLES}/${slug}/favorite`
      );
      return response.data.article;
    } catch (error) {
      this.error = error.message;
    }
  };
}

export default ArticleStore;
