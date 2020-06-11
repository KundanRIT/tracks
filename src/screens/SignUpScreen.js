import React, {useContext} from "react";
import {View, StyleSheet} from "react-native";
import {Context as AuthContext} from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import {NavigationEvents} from "react-navigation";

const SignUpScreen = () => {
  const {state, signUp, clearErrorMessage} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={clearErrorMessage}
      />
      <AuthForm
        header="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signUp}
      />
      <NavLink
        linkText="Already have an account? Sign In instead."
        routeName="SignIn"
      />
    </View>
  );
};

SignUpScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: "25%"
  }
});

export default SignUpScreen;