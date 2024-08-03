import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
const Block = ({ title, image, libName, theme }) => {
  const [loading, setLoading] = useState(true);
  const styles = StyleSheet.create({
    card: {
      borderRadius: 15,
      width: "97%",
      height: 120,
      margin: "1.5%",
      overflow: "hidden",
    },
    backgroundImage: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    imageStyle: {
      borderRadius: 15,
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderWidth: 2,
    },
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    overlayNOIMAGE: {
      backgroundColor: theme.liked,
      flex: 1,
      borderRadius: 15,
      borderColor: theme.likedBorder,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    cardTitle: {
      color: "white",
      fontSize: 24,
      //  fontFamily: "Inter",
      fontWeight: "500",
      lineHeight: 24,
      flexWrap: "wrap",
    },
  });
  return (
    <Link
      href={{
        pathname: "/library",
        params: { libName: libName },
      }}
      asChild
    >
      <Pressable style={styles.card}>
        {image ? (
          <ImageBackground
            source={image}
            style={styles.backgroundImage}
            imageStyle={styles.imageStyle}
            onLoadEnd={() => setLoading(false)}
          >
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}
            <View style={styles.overlay}>
              <Text style={styles.cardTitle}>{title}</Text>
            </View>
          </ImageBackground>
        ) : (
          <View style={styles.backgroundImage}>
            <View style={styles.overlayNOIMAGE}>
              <Text style={styles.cardTitle}>{title}</Text>
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );
};

export default Block;
