import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import { useHistory } from "react-router-dom";
import { useStores } from "../../hooks/useStore";

import RouteURLS from "../../navigation/CONSTANTS";
import { observer } from "mobx-react-lite";

const PaginationBar: React.FC = observer(() => {
  const { articleStore } = useStores();
  const { setPage, setPageSize, page, pageSize, isLoading, getArticles } =
    articleStore;

  const onChangeHandler = (num: number): void => {
    setPage(num);
  };
  const onPageSizeHandler = (current: number, size: number): void => {
    setPageSize(size);
  };
  const history = useHistory();
  useEffect(() => {
    getArticles(pageSize, page);
    history.push(`${RouteURLS.ARTICLES}?limit=${pageSize}&page=${page}`);
  }, [page, history, pageSize, getArticles]);

  return (
    <div className="pagination">
      {!isLoading && (
        <Pagination
          size="small"
          total={5000}
          onChange={onChangeHandler}
          current={page}
          pageSize={pageSize}
          pageSizeOptions={["5", "10", "20"]}
          onShowSizeChange={onPageSizeHandler}
        />
      )}
    </div>
  );
});

export default PaginationBar;
