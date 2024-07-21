import SearchBar from "../search/searchBar";
import ProgramList from "../Program/ProgramList";
import { ProgramListType } from "../../app/common/enum";

export default function HomePage() {
  return (
    <>
      <SearchBar />
      <ProgramList type={ProgramListType.All} />
    </>
  );
}
