import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';

// Simulated data for our examples
const travelDestinations = [
    {
        id: '1',
        name: 'Bali Beaches',
        image: 'https://images.unsplash.com/photo-1657282646325-deb2979c7d09?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Crystal clear waters and pristine beaches',
        rating: 4.8,
    },
    {
        id: '2',
        name: 'Swiss Alps',
        image: 'https://plus.unsplash.com/premium_photo-1689084892324-fd8822cb97c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Majestic mountains and scenic hiking trails',
        rating: 4.9,
    },
    {
        id: '3',
        name: 'Tokyo Nights',
        image: 'https://images.unsplash.com/photo-1516850910840-605d3cdcbd5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Vibrant city life and neon lights',
        rating: 4.7,
    },
    // Add more items as needed
];

const TravelApp = () => {
    const [selectedId, setSelectedId] = useState('');

    // Card Item Component with Animation
    const DestinationCard = ({ item, onPress, scale }) => {
        return (
            <Animated.View style={[
                styles.card,
                { transform: [{ scale }] }
            ]}>
                <TouchableOpacity
                    onPress={onPress}
                    style={styles.cardTouchable}
                >
                    <Image
                        source={{ uri: item.image }}
                        style={styles.cardImage}
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={styles.cardDescription}>{item.description}</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>★ {item.rating}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    // Horizontal Scrolling List
    const renderHorizontalList = () => {
        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Featured Destinations</Text>
                <FlatList
                    style={
                        {
                            padding: 10
                        }
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={travelDestinations}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const scale = new Animated.Value(1);

                        const onPressIn = () => {
                            Animated.spring(scale, {
                                toValue: 0.95,
                                useNativeDriver: true,
                            }).start();
                        };

                        const onPressOut = () => {
                            Animated.spring(scale, {
                                toValue: 1,
                                useNativeDriver: true,
                            }).start();
                        };

                        return (
                            <DestinationCard
                                item={item}
                                onPress={() => setSelectedId(item.id)}
                                scale={scale}
                            />
                        );
                    }}
                    contentContainerStyle={styles.horizontalListContainer}
                />
            </View>
        );
    };

    // Grid List
    const renderGridList = () => {
        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>All Destinations</Text>
                <FlatList
                    data={travelDestinations}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={styles.gridCard}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.gridImage}
                            />
                            <Text style={styles.gridTitle}>{item.name}</Text>
                            <Text style={styles.gridRating}>★ {item.rating}</Text>
                        </View>
                    )}
                    contentContainerStyle={styles.gridListContainer}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginLeft: 15,
                marginBottom: 10,
                color: '#333',
                marginTop: 20
            }}>Travel App</Text>
            {renderHorizontalList()}
            {renderGridList()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    section: {
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 10,
        color: '#333',
    },
    horizontalListContainer: {
        paddingLeft: 15,
    },
    card: {
        width: 280,
        marginRight: 15,
        borderRadius: 15,
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardTouchable: {
        borderRadius: 15,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 160,
    },
    cardContent: {
        padding: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 16,
        color: '#FFD700',
        fontWeight: 'bold',
    },
    gridListContainer: {
        padding: 15,
    },
    gridCard: {
        flex: 1,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    gridImage: {
        width: '100%',
        height: 120,
    },
    gridTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        padding: 10,
    },
    gridRating: {
        fontSize: 12,
        color: '#FFD700',
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
});

export default TravelApp;