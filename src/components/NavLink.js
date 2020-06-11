import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {withNavigation} from "react-navigation";
import Spacer from "./Spacer";

const NavLink = ({navigation, linkText, routeName}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{linkText}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue"
  }
});

export default withNavigation(NavLink);