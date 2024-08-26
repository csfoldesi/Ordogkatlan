import { observer } from "mobx-react-lite";
import InfiniteList from "../../app/common/InfiniteList/InfiniteList";
import ProgramListItem from "./ProgramListItem";
import { ItemGroup, Loader } from "semantic-ui-react";
import ProgramDataSource from "../../app/common/InfiniteList/programDataSource";

export default observer(function ProgramListTest() {
  const dataSource = new ProgramDataSource();
  return (
    <ItemGroup>
      <InfiniteList dataSource={dataSource} loader={<Loader active inline="centered" />}>
        {(program, index) => <ProgramListItem program={program} key={index} />}
      </InfiniteList>
    </ItemGroup>
  );
});
