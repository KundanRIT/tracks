import React, {useContext} from "react";
import {View, StyleSheet} from "react-native";
import {Context as AuthContext} from "../context/AuthContext";
import {NavigationEvents} from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignInScreen = () => {
  const {state, signIn, clearErrorMessage} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={clearErrorMessage}
      />
      <AuthForm
        header="Sign In for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signIn}
      />
      <NavLink
        linkText="Don't have an account? Sign Up instead."
        routeName="SignUp"
      />
    </View>
  );
}

SignInScreen.navigationOptions = () => {
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

export default SignInScreen;