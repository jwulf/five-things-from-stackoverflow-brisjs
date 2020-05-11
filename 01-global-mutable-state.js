// https://www.joshwulf.com/blog/2020/02/avoid-global-state/

// Use an IIFE to create a "singularity" around some genuine state
const getNetworkConnected = (() => {
  // a genuine variable represents some state that must be tracked by a program
  // but it should be isolated from the rest of the program
  let connected = false;
  network.on("disconnect", () => (connected = false));
  network.on("connect", () => (connected = true));

  return function () {
    // return an immutable representation of the current state
    // on demand
    return connected;
  };
})();

// function that returns an immutable value
// representing the state of the network connection at the moment
// that the call is made
getNetworkConnected();
