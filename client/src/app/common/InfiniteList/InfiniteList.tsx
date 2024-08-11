import { observer } from "mobx-react-lite";
import { ListDataSource } from "./listDataSource";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props<T> {
  dataSource: ListDataSource<T>;
  children: (item: T, index: number) => JSX.Element;
  loader?: JSX.Element;
}

export default observer(function InfiniteList<T>({ dataSource, children, loader }: Props<T>) {
  const { itemsCount, itemAtIndex, hasNextPage, loadNextPage } = dataSource;
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  const fetchNextData = useCallback(async () => {
    if (isLoading || !hasNextPage) return;

    setIsLoading(true);
    loadNextPage().then(() => {
      setIsLoading(false);
    });
  }, [isLoading, hasNextPage, loadNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchNextData();
      }
    });

    const current = loaderRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [fetchNextData]);

  const renderLoader = () => {
    if (isLoading) {
      return loader ? loader : <span>LOADING</span>;
    } else {
      return <span></span>;
    }
  };

  return (
    <>
      {Array.from({ length: itemsCount }, (_, i) => i).map((index) => children(itemAtIndex(index), index))}
      <div ref={loaderRef}>{renderLoader()}</div>
    </>
  );
});
