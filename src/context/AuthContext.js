import {AsyncStorage} from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import {navigate} from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return {...state, errorMessage: action.payload};
    case "sign_in":
      return {token: action.payload, errorMessage: ""};
    case "clear_error_message":
      return {...state, errorMessage: ""};
    case "sign_out":
      return {token: null, errorMessage: ""};
    default:
      return state;
  }
}

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({type: "sign_in", payload: token});
    navigate("MainFlow");
  } else {
    navigate("LoginFlow");
  }
}

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: "clear_error_message"});
}

const signUp = (dispatch) => async ({email, password}) => {
  try {
    const response = await trackerApi.post("/signup", {email, password});
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({type: "sign_in", payload: response.data.token});
    navigate("MainFlow");
  } catch (err) {
    dispatch({type: "add_error", payload: "Something went wrong with sign up."});
  }
};

const signIn = (dispatch) => async ({email, password}) => {
  try {
    const response = await trackerApi.post("/signin", {email, password});
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({type: "sign_in", payload: response.data.token});
    navigate("MainFlow");
  } catch (err) {
    dispatch({type: "add_error", payload: "Something went wrong with sign in."});
  }
};

const signOut = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({type: "sign_out"});
  navigate("LoginFlow");
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signIn, signOut, signUp, clearErrorMessage, tryLocalSignIn},
  {token: null, errorMessage: ""}
)