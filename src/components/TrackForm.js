import React, {useContext} from "react";
import {StyleSheet} from "react-native";
import {Input, Button} from "react-native-elements";
import Spacer from "./Spacer";
import {Context as LocationContext} from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const {
    state: {name, recording, locations},
    startRecording,
    stopRecording,
    changeName
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer>
        <Input value={name} placeholder="Track Name" onChangeText={changeName} />
      </Spacer>
      <Spacer>
        {
          recording
          ? <Button title="Stop" onPress={stopRecording} />
          : <Button title="Start Recording" onPress={startRecording} />
        }
      </Spacer>
      <Spacer>
        {
          !recording && locations.length
            ? <Button title="Save Recording" onPress={saveTrack}/>
            : null
        }
      </Spacer>
    </>
  )
}

const styles = StyleSheet.create({});

export default TrackForm;