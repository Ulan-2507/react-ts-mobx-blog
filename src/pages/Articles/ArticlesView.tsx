import { observer } from "mobx-react-lite";
import React from "react";

import { v4 as uuidv4 } from "uuid";
import PaginationBar from "../../components/paginationBar";
import { useStores } from "../../hooks/useStore";
import ShortArticleView from "../Article/ShortArticleView";

export const ArticlesView: React.FC = observer(() => {
  const { articleStore } = useStores();
  const { isLoading, articles } = articleStore;

  return (
    <React.Fragment>
      <ul>
        {!isLoading &&
          articles.map((article) => (
            <ShortArticleView key={uuidv4()} data={article} isFull={false} />
          ))}
      </ul>
      <PaginationBar />
    </React.Fragment>
  );
});
