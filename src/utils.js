import Down from "./dist/audio/down.mp3";
import Fanfare from "./dist/audio/fanfare.mp3";
import Pop from "./dist/audio/pop.mp3";
import Snap from "./dist/audio/snap.mp3";
import Up from "./dist/audio/up.mp3";
import { ref, onValue, set } from "firebase/database";

/* Color List */
export const colorList = ["red", "lightgreen", "yellow", "maroon"];

/* Audio Files */
const topLeft = new Audio(Down);
const topRight = new Audio(Up);
const bottomLeft = new Audio(Pop);
const bottomRight = new Audio(Snap);
const fanFare = new Audio(Fanfare);

export const handleTopLeft = () => {
  topLeft.play();
};

export const handleTopRight = () => {
  topRight.play();
};

export const handleBottomLeft = () => {
  bottomLeft.play();
};

export const handleBottomRight = () => {
  bottomRight.play();
};
export const handleReset = () => {
  fanFare.play();
};

/* End of Audio Files*/

export const playSoundBasedOnColor = (color) => {
  switch (color) {
    case "red":
      handleTopLeft();
      break;
    case "lightgreen":
      handleTopRight();
      break;
    case "yellow":
      handleBottomLeft();
      break;
    case "maroon":
      handleBottomRight();
      break;
    case "fanfare":
      handleReset();
      break;
    default:
      break;
  }
};

export const timeOut = (ms, color) => {
  /*
  This function accepts two parameters:
    1. ms: Time provided for setTimeout function
    2. color: To map corresponding sound 

  This function purpose are :
    1. Play the sound based on the color for the given time interval.  
  */
  playSoundBasedOnColor(color);
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const playSequence = async (currentColorList, setQuadFlash) => {
  /*
  This function accepts two parameters: 
    1. currentColorList: List of colors randomly choosen from the colorList
    2. setQuadFlash: To pass the dispatcher in the changeFlash function

  The purpose of this function are:
    1. For each color present in the currenColorList we are modifying corresponding
       object in the state with the help of changeFlash function
  
  */
  for (let i = 0; i < currentColorList.length; i++) {
    switch (currentColorList[i]) {
      case "red":
        await changeFlash(
          "red",
          { flashQuad1: "flash" },
          { flashQuad1: "" },
          setQuadFlash
        );
        break;
      case "lightgreen":
        await changeFlash(
          "lightgreen",
          { flashQuad2: "flash" },
          { flashQuad2: "" },
          setQuadFlash
        );
        break;
      case "yellow":
        await changeFlash(
          "yellow",
          { flashQuad3: "flash" },
          { flashQuad3: "" },
          setQuadFlash
        );
        break;
      case "maroon":
        await changeFlash(
          "maroon",
          { flashQuad4: "flash" },
          { flashQuad4: "" },
          setQuadFlash
        );
        break;
      default:
    }
  }
};

const changeFlash = async (color, flashObj, unFlashObj, setQuadFlash) => {
  /*
  This function takes following parameters:
    1. color: This will be passed as argument to timeOut function.
    2. flashObj: This consist of the object as { flashQuad1/2/3/4 : "flash" } to change the state.
    3. unFlashObj: This consist of the object as { flashQuad1/2/3/4: ""} to un flash the state.
    4. setQuadFlash: This is the dispatch from the redux.

  The purpose of this function are:
    1. Dispatch the QuadFlash action in reducer and set the className as flash
    2. Call the timeOut function so that based on click of quadrant sound will come.
    3. Dispatch the QuadFlash action in reducer and set the className as ""
    4. Call the timeOut function so that it waits for 500 ms before calling this function again.
  */

  setQuadFlash(flashObj);
  await timeOut(500, color);
  setQuadFlash(unFlashObj);
  await timeOut(500);
};

export const getData = (database, setTopScore) => {
  onValue(ref(database, "highestScore"), (snapshot) => {
    if (snapshot.exists()) {
      setTopScore(snapshot.val());
    }
  });
};

export const setData = (database, newScore) => {
  set(ref(database, "highestScore/"), newScore);
};
