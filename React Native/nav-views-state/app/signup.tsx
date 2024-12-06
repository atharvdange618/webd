import { useRouter } from 'expo-router'
import { View, Text } from 'react-native'
import MyButton from './MyButton'

const Signup = () => {
    const route = useRouter()
    const onContinue = () => {
        route.navigate('/scrlviewexp')
    }
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <MyButton title={'Signup'} onPress={onContinue} />
        </View>
    )
}

export default Signup