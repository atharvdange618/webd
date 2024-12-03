import { View } from "react-native";
import MyButton from "./MyButton";
import { useRouter } from "expo-router";

export default function Index() {
  const route = useRouter()

  const changePage = () => {
    route.navigate('/login')
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MyButton title='Continue' onPress={changePage} />
    </View>
  );
}