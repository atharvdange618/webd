import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerTitle}>Leader Board</Text>
        <View style={styles.mainCardContainer}>
          {[3, 1, 2].map((item, index) => {
            return (
              <View
                style={[styles.mainCard, item !== 1 && { marginTop: 20 }]}
                key={index}
              >
                <Image
                  source={{
                    uri: "https://i.pinimg.com/736x/79/c5/cc/79c5cc4f546736afdf091a10f502415a.jpg",
                  }}
                  style={styles.mainCardImage}
                  resizeMode="cover"
                />
                <Text style={styles.mainCardTitle}>Daisy</Text>
                <View style={styles.mainCardRankContainer}>
                  <Text style={styles.mainCardRankContainerText}>{item}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.card} key={index}>
              <View style={styles.cardDataContainer}>
                <Text style={styles.cardIndex}>{item}</Text>
                <Image
                  source={{
                    uri: "https://i.pinimg.com/736x/79/c5/cc/79c5cc4f546736afdf091a10f502415a.jpg",
                  }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <Text style={styles.cardIndex}>Daisy Jones</Text>
              </View>

              <View style={styles.cardRankContainer}>
                <Text style={styles.cardRankTitle}>103</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272c35",
  },
  topContainer: {
    backgroundColor: "#1a1f25",
    paddingTop: 30,
    padding: 20,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    gap: 20,
    paddingBottom: 50,
  },
  headerTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
  },
  mainCardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  mainCard: {
    backgroundColor: "#272c35",
    padding: 20,
    alignItems: "center",
    borderRadius: 20,
    gap: 15,
    height: 175,
  },
  mainCardImage: {
    width: 70,
    height: 80,
    borderRadius: 20,
  },
  mainCardTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: 600,
  },
  mainCardRankContainer: {
    backgroundColor: "orange",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    position: "absolute",
    bottom: -15,
  },
  mainCardRankContainerText: {
    color: "white",
  },
  card: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardIndex: {
    color: "white",
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 15,
  },
  cardTitle: {
    color: "white",
    fontSize: 17,
  },
  cardRankContainer: {},
  cardRankTitle: {
    color: "orange",
  },
});

export default index;
