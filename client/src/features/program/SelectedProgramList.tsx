import { ProgramListType } from "../../app/common/enum";
import ProgramList from "./ProgramList";

export default function SelectedProgramList() {
  return (
    <>
      <ProgramList type={ProgramListType.Selected} />
    </>
  );
}
