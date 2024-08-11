import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import InfiniteList from "../../app/common/InfiniteList/InfiniteList";
import { useEffect } from "react";
import ProgramListItem from "./ProgramListItem";
import { ItemGroup, Loader } from "semantic-ui-react";

export default observer(function ProgramListTest() {
  const { programStore } = useStore();
  const { loadPrograms } = programStore;

  useEffect(() => {
    loadPrograms(true);
  }, [loadPrograms]);

  return (
    <ItemGroup>
      <InfiniteList dataSource={programStore} loader={<Loader active inline="centered" />}>
        {(program, index) => <ProgramListItem program={program} key={index} />}
      </InfiniteList>
    </ItemGroup>
  );
});
