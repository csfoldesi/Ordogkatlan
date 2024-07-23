import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ProgramListItem from "./ProgramListItem";
import { Item, ItemGroup, Loader } from "semantic-ui-react";
import { ProgramListType } from "../../app/common/enum";
import { PagingParams } from "../../app/models/pagination";
import useInfiniteScroll from "react-infinite-scroll-hook";

interface Props {
  type: ProgramListType;
}

export default observer(function ProgramList({ type }: Props) {
  const { programStore } = useStore();
  const { programList, loadPrograms, loadSelectedPrograms, pagination, setPagingParams, hasNextPage, isLoading } =
    programStore;

  useEffect(() => {
    if (type === ProgramListType.All) {
      loadPrograms(true);
    } else if (type === ProgramListType.Selected) {
      loadSelectedPrograms(true);
    }
  }, [type, loadPrograms, loadSelectedPrograms]);

  const loadMore = () => {
    setPagingParams(new PagingParams(pagination!.currentPage + 1, pagination?.itemsPerPage));
    if (type === ProgramListType.All) {
      loadPrograms();
    } else if (type === ProgramListType.Selected) {
      loadSelectedPrograms();
    }
  };

  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: loadMore,
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <ItemGroup>
      {programList.map((program) => (
        <ProgramListItem program={program} key={program.performanceId} />
      ))}
      {hasNextPage && (
        <Item ref={infiniteRef}>
          <Loader />
        </Item>
      )}
    </ItemGroup>
  );
});
