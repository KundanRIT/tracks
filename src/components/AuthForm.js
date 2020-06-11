import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {Text, Input, Button} from "react-native-elements";
import Spacer from "../components/Spacer";

const AuthForm = ({header, errorMessage, submitButtonText, onSubmit}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer>
        <Text h3 style={styles.title}>{header}</Text>
      </Spacer>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Spacer />
      <Input
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        label="Password"
        value={password}
        onChangeText={setPassword}
      />
      {
        errorMessage
          ? <Text style={styles.errorMessage}>{errorMessage}</Text>
          : null
      }
      <Spacer>
        <Button title={submitButtonText} onPress={() => onSubmit({email, password})} />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center"
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginTop: 15,
    marginLeft: 15
  }
});

export default AuthForm;