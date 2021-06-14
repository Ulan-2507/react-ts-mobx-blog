import React from "react";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";
import Modal from "../../components/modal-window";
import RouteURLS from "../../navigation/CONSTANTS";

import { IArticle } from "../../types/article";
import ShortArticleView from "./ShortArticleView";

type PropsType = {
  article: IArticle;
  isOwnArticle: boolean;
  setEdit: (value: boolean) => void;
  showHandler: () => void;
  deleteHandler: () => void;
  showModal: boolean;
};

export const FullArticleView: React.FC<PropsType> = ({
  article,
  isOwnArticle,
  setEdit,
  showHandler,
  deleteHandler,
  showModal,
}) => {
  return (
    <ShortArticleView data={article} isFull={true}>
      <div className="article__row">
        <p>{article.description}</p>
        {isOwnArticle && (
          <div className="article__control-btns">
            <button
              className="article__btn article__btn--delete"
              onClick={showHandler}
              type="button"
            >
              Delete
            </button>
            <NavLink
              className="article__btn article__btn--edit"
              onClick={() => setEdit(true)}
              to={`${RouteURLS.ARTICLES}/${article.slug}/edit`}
            >
              Edit
            </NavLink>
            <Modal
              showModal={showModal}
              showHandler={showHandler}
              deleteHandler={deleteHandler}
            />
          </div>
        )}
      </div>
      <ReactMarkdown>{article.body}</ReactMarkdown>
    </ShortArticleView>
  );
};
