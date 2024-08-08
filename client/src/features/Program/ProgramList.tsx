import { useStore } from "../../app/stores/store";
import { useEffect, useState } from "react";
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
  const { programList, loadPrograms, loadSelectedPrograms, pagination, setPagingParams, hasNextPage, isLoading } =
    programStore;
  const [moreProgramLoading, setMoreProgramLoading] = useState(false);

  useEffect(() => {
    if (type === ProgramListType.All) {
      loadPrograms(true);
    } else if (type === ProgramListType.Selected) {
      loadSelectedPrograms(true);
    }
  }, [type, loadPrograms, loadSelectedPrograms]);

  const loadMore = () => {
    setMoreProgramLoading(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1, pagination?.itemsPerPage));
    if (type === ProgramListType.All) {
      loadPrograms().then(() => setMoreProgramLoading(false));
    } else if (type === ProgramListType.Selected) {
      loadSelectedPrograms().then(() => setMoreProgramLoading(false));
    }
  };

  const [infiniteRef] = useInfiniteScroll({
    loading: moreProgramLoading,
    hasNextPage,
    onLoadMore: loadMore,
    rootMargin: "0px 0px 400px 0px",
  });

  if (isLoading && !moreProgramLoading) {
    return <LoadingComponent content="Betöltés..." inverted={false} />;
  }

  return (
    <ItemGroup>
      {programList.map((program) => (
        <ProgramListItem program={program} key={program?.performanceId} />
      ))}
      {hasNextPage && (
        <Item ref={infiniteRef}>
          <Loader active inline="centered" />
        </Item>
      )}
    </ItemGroup>
  );
});
