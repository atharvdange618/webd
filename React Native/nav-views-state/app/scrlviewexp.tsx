import { FlatList, Text, View } from 'react-native'
import React from 'react'

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-asdf-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd9vcxadf6-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4fasdfasdr8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-asdfasdfwe145571e29d72',
        title: 'Third Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbwefdsgsdfd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145sdfhgsdhntnr571e29d72',
        title: 'Third Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbhtkjtykd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-1445yfjhg5571e29d72',
        title: 'Third Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbdq34t5asdg91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145erjhgj571e29d72',
        title: 'Third Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbe5r6y4hd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-1455erjftjh71e29d72',
        title: 'Third Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbdw46tw91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145534yjfghj571e29d72',
        title: 'Third Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-56tytyhrjh',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-14dsffgddsf5571e29d72',
        title: 'Third Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fsdaASDFbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-1asdfadf45571e29d72',
        title: 'Third Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbfdghdfghdfd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-14asdtasdf5571e29d72',
        title: 'Third Item',
    },
];

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
    <View style={{
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }}>
        <Text style={{
            fontSize: 32,
        }}>{title}</Text>
    </View>
);

const ScrlViewExp = () => {
    return (
        <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
        />
    )
}
export default ScrlViewExp