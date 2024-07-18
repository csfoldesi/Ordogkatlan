import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ProgramListItem from "./ProgramListItem";
import { ItemGroup } from "semantic-ui-react";

export default observer(function ProgramList() {
  const { programStore } = useStore();
  const { programList, loadPrograms } = programStore;

  useEffect(() => {
    loadPrograms();
  }, [loadPrograms]);

  return (
    <ItemGroup>
      {programList.map((program) => (
        <ProgramListItem program={program} />
      ))}
    </ItemGroup>
  );
});
