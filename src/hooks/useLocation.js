import {useState, useEffect} from "react";
import {requestPermissionsAsync, watchPositionAsync, Accuracy} from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  useEffect(() => {

    let subscriber;

    const startWatching = async () => {
      return await requestPermissionsAsync().then(value => {
        if (!value.granted) {
          setErr(value.status);
        } else {
          getLocationAsync();
        }
      });
    };

    const getLocationAsync = async () => {
      subscriber = await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      }, callback);
    }

    if (shouldTrack) {
      startWatching();
    } else {
      subscriber = null;
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, (callback)]);

  return [err];
}