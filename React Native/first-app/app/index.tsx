import { Text, View } from "react-native"

const Index = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: '700', color: 'purple' }}>Hello welcome to my first react app</Text>
    </View>
  )
}

export default Index