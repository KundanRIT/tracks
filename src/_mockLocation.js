import * as Location from "expo-location";

const tenMetersWithDegrees = 0.0001;

const getLocation = (increment) => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 10,
      heading: 321.39410400390625,
      accuracy: 14.909000396728516,
      altitudeAccuracy: 14.909000396728516,
      altitude: 166.10000610351562,
      longitude: -78.8259841 + increment * tenMetersWithDegrees,
      latitude: 42.9523929 + increment * tenMetersWithDegrees
    }
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  });
  counter++;
}, 1000);