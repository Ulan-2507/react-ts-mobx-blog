import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useStores } from "../../hooks/useStore";
import RouteURLS from "../../navigation/CONSTANTS";

import { FullArticleView } from "./FullArticleView";

const ArticleContainer: React.FC = observer(() => {
  const { slug }: any = useParams();

  const { articleStore, userStore } = useStores();
  const { article, isLoading, setEdit, deleteArticle, getArticle } =
    articleStore;
  const { user } = userStore;

  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const showHandler = () => {
    setShowModal((showModal) => !showModal);
  };

  const deleteHandler = () => {
    deleteArticle(slug);
    setShowModal((showModal) => !showModal);
    history.push(RouteURLS.ARTICLES);
  };

  const isOwnArticle = user?.username === article?.author.username;
  useEffect(() => {
    getArticle(slug);
  }, [slug, getArticle]);

  return (
    <React.Fragment>
      {!isLoading && article && (
        <FullArticleView
          article={article}
          isOwnArticle={isOwnArticle}
          setEdit={setEdit}
          showHandler={showHandler}
          deleteHandler={deleteHandler}
          showModal={showModal}
        />
      )}
    </React.Fragment>
  );
});
export default ArticleContainer;
