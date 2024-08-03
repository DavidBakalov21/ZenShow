import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import HeaderLib from "../components/library/headerLib";
import { PlayerContext } from "../components/other/PlayerContext";
import MediaControl from "../components/other/mediaController";
import { useIsFocused } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../components/other/themes";
import { getData } from "../components/other/database";
import AboutComponent from "../components/about/aboutComponent";
const About = () => {
  const { soundRef, triggerApear } = useContext(PlayerContext);
  const isFocused = useIsFocused();
  const [expanded, setExpanded] = useState(null);

  const [isDark, setIsDark] = useState(false);
  const currentTheme = isDark ? darkTheme : lightTheme;
  useEffect(() => {
    const loadThemePreference = async () => {
      const storedTheme = await getData("theme");
      if (storedTheme !== null) {
        setIsDark(storedTheme.isDark);
      }
    };
    loadThemePreference();
  }, [isFocused]);
  const toggleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
  };
  const styles = StyleSheet.create({
    outerContainer: {
      flex: 1,
      backgroundColor: currentTheme.ColorHeader,
    },
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor,

      paddingLeft: "2%",
    },
    textTouchableOpacity: {
      marginTop: "6%",
    },
    text: {
      fontSize: 18,
      color: "white",
    },
    textContent: {
      fontSize: 16,
      color: "white",
      //marginTop: 10,
    },
  });
  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.safeArea}>
        <HeaderLib title={"About"} destination={"settings"} />
        <ScrollView style={styles.container}>
          <TouchableOpacity
            style={styles.textTouchableOpacity}
            onPress={() => toggleExpand("terms")}
          >
            <Text style={styles.text}>Terms of service</Text>
            {expanded === "terms" && (
              <>
                <AboutComponent
                  theme={currentTheme}
                  title={"Terms and Conditions"}
                  textContent={`Welcome to Zen Sounds. By using our app, you agree to the following terms and conditions. Please read them carefully.`}
                />

                <AboutComponent
                  theme={currentTheme}
                  title={"Use of the App"}
                  textContent={`Zen Sounds provides a collection of nature and ambient sounds designed to enhance your relaxation, meditation, and sleep. By using this app, you agree to use it in accordance with these terms.`}
                />

                <AboutComponent
                  theme={currentTheme}
                  title={"License"}
                  textContent={`Zen Sounds grants you a non-exclusive, non-transferable license to use the app for personal, non-commercial purposes. You may not modify, distribute, or create derivative works based on the app's content.`}
                />

                <AboutComponent
                  theme={currentTheme}
                  title={"Liability"}
                  textContent={`Usage Responsibility: Zen Sounds is not liable for any outcomes related to how you use the audio files or the app. You are solely responsible for your use of the app. 
No Warranties: The app is provided "as is" without warranties of any kind. We do not guarantee that the app will meet your requirements or be available without interruption. 
Limitation of Liability: In no event shall Zen Sounds, its creators, or affiliates be liable for any direct, indirect, incidental, or consequential damages arising from your use of the app.`}
                />

                <AboutComponent
                  theme={currentTheme}
                  title={"No Legal Claims"}
                  textContent={`By using Zen Sounds, you agree to waive any right to file legal claims or lawsuits against Zen Sounds, its creators, or affiliates. This includes, but is not limited to, claims related to the use or performance of the app and its content.`}
                />

                <AboutComponent
                  theme={currentTheme}
                  title={"Updates and Changes"}
                  textContent={`We may update the app and these terms from time to time. Continued use of the app after any changes constitutes your acceptance of the new terms.`}
                />

                <AboutComponent
                  theme={currentTheme}
                  title={"Governing Law"}
                  textContent={`These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law principles.`}
                />

                <AboutComponent
                  theme={currentTheme}
                  title={"Contact Us"}
                  textContent={`If you have any questions about these terms, please contact us at +447517634161.`}
                />

                <AboutComponent
                  theme={currentTheme}
                  title={""}
                  textContent={`By using Zen Sounds, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please do not use the app.`}
                />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.textTouchableOpacity}
            onPress={() => toggleExpand("privacy")}
          >
            <Text style={styles.text}>Privacy policy</Text>
            {expanded === "privacy" && (
              <>
                <AboutComponent
                  theme={currentTheme}
                  title={"Privacy Policy"}
                  textContent={
                    "Zen Sounds is committed to protecting your privacy. We understand that your personal information is important, and we want to assure you that we do not distribute, sell, or share any of your data. Below, we outline our privacy practices to help you understand what information we collect, how we use it, and how we protect it."
                  }
                />
                <AboutComponent
                  theme={currentTheme}
                  title={"Information We Collect"}
                  textContent={`Usage Data: We collect anonymous data regarding how you use the app, such as the sounds you listen to and the duration of your sessions. This information helps us improve the app's performance and user experience. 
Device Information: We collect information about the device you use to access Zen Sounds, such as the device type, operating system, and version. This helps us ensure compatibility and optimize the app for different devices.`}
                />
                <AboutComponent
                  theme={currentTheme}
                  title={"How We Use Your Information"}
                  textContent={`Improving the App: The usage and device information we collect helps us identify issues, understand user preferences, and enhance the app's features and functionality. 
Customer Support: If you contact us for support, we may use the information you provide to resolve your issue and improve our customer service.`}
                />
                <AboutComponent
                  theme={currentTheme}
                  title={"Data Security"}
                  textContent={`We take data security seriously and implement appropriate technical and organizational measures to protect your information from unauthorized access, loss, or misuse. Our security practices are designed to ensure the confidentiality and integrity of your data.`}
                />
                <AboutComponent
                  theme={currentTheme}
                  title={"No Data Sharing"}
                  textContent={`Zen Sounds does not share, sell, or distribute your personal data to third parties. We do not use your information for advertising purposes, and we do not engage in any practices that compromise your privacy.`}
                />
                <AboutComponent
                  theme={currentTheme}
                  title={"Changes to This Privacy Policy"}
                  textContent={`We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make changes, we will update the policy within the app and notify you of any significant changes.`}
                />
                <AboutComponent
                  theme={currentTheme}
                  title={"Contact Us"}
                  textContent={`If you have any questions or concerns about our privacy policy or data practices, please contact us at +447517634161.`}
                />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.textTouchableOpacity}
            onPress={() => toggleExpand("mission")}
          >
            <Text style={styles.text}>Our Mission</Text>
            {expanded === "mission" && (
              <AboutComponent
                title={""}
                theme={currentTheme}
                textContent={`We believe everyone deserves peace and calm in their lives. Our mission is to give moments of tranquillity through the power of nature and ambient sounds.

Imagine a world where you can escape the noise and stress of everyday life with just a tap on your phone. Whether you’re doing yoga, winding down for sleep, or simply taking a break, Zen Sounds is here to provide the perfect soundtrack for your moments of peace.

At Zen Sounds, we are committed to continuously improving our app based on your feedback. We regularly update our sound library to provide fresh and engaging content, ensuring that Zen Sounds remains a cherished part of your daily routine.`}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.textTouchableOpacity}
            onPress={() => toggleExpand("version")}
          >
            <Text style={styles.text}>App version</Text>
            {expanded === "version" && (
              <AboutComponent
                title={""}
                theme={currentTheme}
                textContent={`0.1`}
              />
            )}
          </TouchableOpacity>
        </ScrollView>
        {soundRef.current !== null && triggerApear === true && (
          <MediaControl theme={currentTheme} />
        )}
      </SafeAreaView>
    </View>
  );
};

export default About;
