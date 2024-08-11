export interface ListDataSource<T> {
  itemsCount: number;
  itemAtIndex(index: number): T;
  hasNextPage: boolean;
  loadNextPage(): Promise<void>;
}
