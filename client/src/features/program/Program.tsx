import { ProgramListType } from "../../app/common/enum";
import SearchBar from "../search/searchBar";
import ProgramList from "./ProgramList";

export default function Program() {
  return (
    <>
      <SearchBar />
      <ProgramList type={ProgramListType.All} />
    </>
  );
}
