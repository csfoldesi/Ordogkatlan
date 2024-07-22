import { useStore } from "../../app/stores/store";
import { useEffect, useState } from "react";
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
  const {
    programList: groupedProgramList,
    loadPrograms,
    loadSelectedPrograms,
    pagination,
    setPagingParams,
    hasNextPage,
  } = programStore;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === ProgramListType.All) {
      loadPrograms(true);
    } else if (type === ProgramListType.Selected) {
      loadSelectedPrograms(true);
    }
  }, [type, loadPrograms, loadSelectedPrograms]);

  const loadMore = () => {
    setLoading(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1, pagination?.itemsPerPage));
    if (type === ProgramListType.All) {
      loadPrograms().then(() => setLoading(false));
    } else if (type === ProgramListType.Selected) {
      loadSelectedPrograms().then(() => setLoading(false));
    }
  };

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <ItemGroup>
      {groupedProgramList.map((program) => (
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
