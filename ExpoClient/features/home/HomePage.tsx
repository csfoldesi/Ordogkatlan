import { ProgramDTO } from "@/app/models/program";
import { useStore } from "@/app/stores/store";
import { ListItem } from "@rneui/base";
import { observer } from "mobx-react";

import React, { useEffect } from "react";
import { FlatList, View } from "react-native";

export default observer(function HomePage() {
  const { programStore } = useStore();
  const { loadPrograms, programList } = programStore;

  useEffect(() => {
    loadPrograms();
  }, [loadPrograms]);

  const keyExtractor = (item: ProgramDTO, index: number) => item.performanceId;

  const renderItem = ({ item }: { item: ProgramDTO }) => (
    <ListItem>
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.description?.replace(/<[^>]*>/g, "")}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
      }}>
      <FlatList keyExtractor={keyExtractor} data={programList} renderItem={renderItem} />
    </View>
  );
});
