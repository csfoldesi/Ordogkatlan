import { ListDataSource } from "./listDataSource";
import { useCallback, useEffect, useRef, useState } from "react";

type Props<T> = {
  dataSource: ListDataSource<T>;
  children: (item: T, index: number) => JSX.Element;
  loader?: JSX.Element;
};

export default function InfiniteList<T>({ dataSource, children, loader }: Props<T>) {
  const { hasNextPage, loadNextPage } = dataSource;
  const [data, setData] = useState(Array<T>);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  const fetchNextData = useCallback(async () => {
    if (isLoading || !hasNextPage) return;

    setIsLoading(true);
    loadNextPage().then(() => {
      setData(dataSource.data);
      setIsLoading(false);
    });
  }, [isLoading, hasNextPage, loadNextPage, dataSource]);

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

  /*return (
    <>
      {Array.from({ length: itemsCount }, (_, i) => i).map((index) => children(itemAtIndex(index), index))}
      <div ref={loaderRef}>{renderLoader()}</div>
    </>
  );*/
  return (
    <>
      {data.map((item, index) => children(item, index))}
      <div ref={loaderRef}>{renderLoader()}</div>
    </>
  );
}
