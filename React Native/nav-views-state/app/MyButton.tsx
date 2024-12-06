import { Text, TouchableOpacity } from 'react-native'

const MyButton = ({ title, onPress }) => {

    return (
        <TouchableOpacity style={{
            width: 100,
            height: 50,
            backgroundColor: "red",
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10
        }} activeOpacity={0.8} onPress={onPress}>
            <Text style={{
                color: "white",
                fontWeight: 600,
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default MyButton