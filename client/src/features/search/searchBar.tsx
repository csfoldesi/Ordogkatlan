import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent, useEffect } from "react";

export default observer(function SearchBar() {
  const { catalogStore, filterStore, programStore } = useStore();
  const { catalog, dateSource, loadCatalogs } = catalogStore;

  useEffect(() => {
    loadCatalogs();
  }, [loadCatalogs]);

  const handleVillageChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    filterStore.setSelectedVillages(data.value as string[]);
    programStore.loadPrograms(true);
  };

  const handleStageChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    filterStore.setSelectedStages(data.value as string[]);
    programStore.loadPrograms(true);
  };

  const dateSelected = (date: string | undefined) => {
    filterStore.selectDate(date);
    programStore.loadPrograms(true);
  };

  const handleTextSearch = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      programStore.loadPrograms(true);
    }
  };

  if (!catalog) {
    return null;
  }

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Select
            placeholder="Dátum"
            value={filterStore.selectedDateString}
            options={dateSource!}
            onChange={(e, data) => {
              dateSelected(data.value?.toString());
            }}
          />
          <Form.Input
            placeholder="Keresés"
            icon="search"
            value={filterStore.searchText}
            onChange={(e, data) => filterStore.setSearchText(data.value)}
            onKeyDown={handleTextSearch}
          />
          <Dropdown
            fluid
            placeholder="Települések"
            multiple
            selection
            search
            value={filterStore.selectedVillages}
            options={catalogStore.villages}
            onChange={handleVillageChange}
          />
        </Form.Group>
        <Form.Group>
          <Dropdown
            fluid
            placeholder="Helyszínek"
            multiple
            selection
            search
            value={filterStore.selectedStages}
            options={catalogStore.filteredStages}
            onChange={handleStageChange}
          />
        </Form.Group>
      </Form>
    </>
  );
});
