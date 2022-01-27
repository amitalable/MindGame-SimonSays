import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  reset,
  setCurrentHighestScore,
  setInputLocked,
  updateCounter,
  updateCurrentColorList,
  updateCurrentCounter,
  updateQuadFlash,
} from "../redux/action";
import {
  playSoundBasedOnColor,
  colorList,
  playSequence,
  timeOut,
} from "../utils";

function ColorCard(props) {
  const {
    quadObj,
    setCounter,
    setCurrentColorList,
    setQuadFlash,
    setCurrentCounter,
    setReset,
    setCurrentHighestScore,
    setInputLocked,
  } = props;

  //DONE: Destructue the object present in quadObj
  const {
    flashQuad1,
    flashQuad2,
    flashQuad3,
    flashQuad4,
    currentColorList,
    counter,
    currentCounter,
    inputLocked,
  } = quadObj;

  // useEffect(() => {
  //   localStorage.setItem("quadObj", JSON.stringify(quadObj));
  // }, [quadObj]);

  useEffect(() => {
    const fetchData = async (currentColorList, setQuadFlash) => {
      //Play the sequence based on the change in currentColorList

      await playSequence(currentColorList, setQuadFlash);
    };

    fetchData(currentColorList, setQuadFlash);
  }, [currentColorList, setQuadFlash]);

  const handleSubmit = async () => {
    // Increment the counter and add another color in the list.
    setInputLocked(true);
    setCounter(counter + 1);
    setCurrentColorList(colorList[Math.floor(Math.random() * 4)]);
  };

  const compareSequence = async (color) => {
    // if the currentColorList is empty -> Do nothing
    if (!currentColorList) return;

    playSoundBasedOnColor(color);
    // if the color present at the currentCounter position in the
    //currentColorList is same as the color -> Update currentCounter

    if (currentColorList[currentCounter] === color) {
      if (currentCounter === currentColorList.length - 1) {
        await timeOut(1000);
        handleSubmit();
        setCurrentCounter(0);
        await timeOut(2000);
      } else {
        setCurrentCounter(currentCounter + 1);
      }
    } else {
      setCurrentHighestScore(counter - 1);
      setReset();
      playSoundBasedOnColor("fanfare");
    }
  };

  return (
    <div className="container">
      <div className="circle">
        <div className="row-top">
          <div
            className={`panel top-left ${flashQuad1}`}
            onClick={() => inputLocked && compareSequence("red")}
          ></div>
          <div
            className={`panel top-right ${flashQuad2}`}
            onClick={() => inputLocked && compareSequence("lightgreen")}
          ></div>
        </div>
        <div className="inner-circle">
          <span
            className="start-button"
            onClick={() => !inputLocked && handleSubmit()}
          >
            {counter === 0 ? "Start" : counter}
          </span>
        </div>
        <div className="row-bottom">
          <div
            className={`panel bottom-left ${flashQuad3}`}
            onClick={() => inputLocked && compareSequence("yellow")}
          ></div>
          <div
            className={`panel bottom-right ${flashQuad4}`}
            onClick={() => inputLocked && compareSequence("maroon")}
          ></div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quadObj: state.quadObj,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setCounter: (counter) => dispatch(updateCounter(counter)),
  setCurrentColorList: (color) => dispatch(updateCurrentColorList(color)),
  setQuadFlash: (obj) => dispatch(updateQuadFlash(obj)),
  setCurrentCounter: (counter) => dispatch(updateCurrentCounter(counter)),
  setReset: () => dispatch(reset()),
  setCurrentHighestScore: (score) => dispatch(setCurrentHighestScore(score)),
  setInputLocked: (lock) => dispatch(setInputLocked(lock)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorCard);
