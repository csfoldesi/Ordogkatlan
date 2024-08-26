export type ListDataSource<T> = {
  //itemsCount: number;
  //itemAtIndex(index: number): T;
  data: T[];
  hasNextPage: boolean;
  loadNextPage(): Promise<void>;
};
