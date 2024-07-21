import { Button, Container, Select } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";

export default observer(function SearchBar() {
  const { catalogStore, filterStore, programStore } = useStore();
  const { catalog, dateSource, loadCatalogs } = catalogStore;

  useEffect(() => {
    loadCatalogs();
  }, [loadCatalogs]);

  const toggleVillage = (villageId: string) => {
    filterStore.selectVillageToggle(villageId);
    programStore.loadPrograms(true);
  };

  const toggleStage = (stageId: string) => {
    filterStore.selectStageToggle(stageId);
    programStore.loadPrograms(true);
  };

  const dateSelected = (date: string | undefined) => {
    filterStore.selectDate(date);
    programStore.loadPrograms(true);
  };

  if (!catalog) {
    return null;
  }

  return (
    <>
      <Container>
        <Select
          placeholder="dátum"
          options={dateSource!}
          onChange={(e, data) => {
            dateSelected(data.value?.toString());
          }}
        />
        {catalog.villages.map((village) => (
          <Button
            toggle
            key={village.id}
            active={filterStore.villageIsSelected(village.id)}
            onClick={() => toggleVillage(village.id)}>
            {village.name}
          </Button>
        ))}
      </Container>
      <Container>
        {filterStore.selectedVillages.map((village) => {
          const stages = catalogStore.getStagesByVillageId(village);
          return stages?.map((stage) => (
            <Button
              toggle
              size="mini"
              key={stage.id}
              active={filterStore.stageIsSelected(stage.id)}
              onClick={() => toggleStage(stage.id)}>
              {stage.name}
            </Button>
          ));
        })}
      </Container>
    </>
  );
});
