import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ProgramListItem from "./ProgramListItem";
import { Item, ItemGroup, Loader } from "semantic-ui-react";
import { ProgramListType } from "../../app/common/enum";
import { PagingParams } from "../../app/models/pagination";
import useInfiniteScroll from "react-infinite-scroll-hook";
import LoadingComponent from "../../app/layout/LoadingComponent";

interface Props {
  type: ProgramListType;
}

export default observer(function ProgramList({ type }: Props) {
  const { programStore } = useStore();
  const {
    programList,
    loadPrograms,
    loadNextPrograms,
    loadSelectedPrograms,
    loadNextSelectedPrograms,
    pagination,
    resetPagination: resetPagingParams,
    setPagingParams,
    hasNextPage,
    isLoading,
    isNextLoading,
  } = programStore;

  useEffect(() => {
    resetPagingParams();
    if (type === ProgramListType.All) {
      loadPrograms(true);
    } else if (type === ProgramListType.Selected) {
      loadSelectedPrograms(true);
    }
  }, [type, loadPrograms, loadSelectedPrograms, resetPagingParams]);

  const loadMore = () => {
    setPagingParams(new PagingParams(pagination!.currentPage + 1, pagination?.itemsPerPage));
    if (type === ProgramListType.All) {
      loadNextPrograms();
    } else if (type === ProgramListType.Selected) {
      loadNextSelectedPrograms();
    }
  };

  const [infiniteRef] = useInfiniteScroll({
    loading: isNextLoading,
    hasNextPage,
    onLoadMore: loadMore,
    rootMargin: "0px 0px 400px 0px",
  });

  /*if (isLoading && !moreProgramLoading) {
    return <LoadingComponent content="Betöltés..." inverted={false} />;
  }*/

  return (
    <ItemGroup>
      {isLoading && !isNextLoading ? (
        <LoadingComponent content="Betöltés..." inverted={false} />
      ) : (
        programList.map((program) => <ProgramListItem program={program} key={program?.performanceId} />)
      )}

      {hasNextPage && (
        <Item ref={infiniteRef}>
          <Loader active inline="centered" />
        </Item>
      )}
    </ItemGroup>
  );
});
