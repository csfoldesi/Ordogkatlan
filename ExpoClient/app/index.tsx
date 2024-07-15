import HomePage from "@/features/home/HomePage";
import { Text, View } from "react-native";
import { Button } from "@rneui/base";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <HomePage />
    </View>
  );
}
