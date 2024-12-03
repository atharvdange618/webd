import { View, Text } from 'react-native'
import MyButton from './MyButton'
import { useRouter } from 'expo-router'

const Login = () => {
    const route = useRouter()
    const onContinue = () => {
        route.navigate('/signup')
    }
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <MyButton title={'Login'} onPress={onContinue} />
        </View>
    )
}

export default Login