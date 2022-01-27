import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ColorCard from "../components/ColorCard";
import database from "../firebase-config";
import { getData, setData } from "../utils";

const Home = ({ quadObj }) => {
  const { currentHighestScore } = quadObj;
  const [topScore, setTopScore] = useState(0);

  useEffect(() => {
    const fetchData = async (database, setTopScore) => {
      await getData(database, setTopScore);
    };
    fetchData(database, setTopScore);
  }, []);

  useEffect(() => {
    if (currentHighestScore > topScore) {
      setTopScore(currentHighestScore);
    }
  }, [currentHighestScore, topScore]);

  useEffect(() => {
    if(topScore>0)
    setData(database, topScore);
  }, [topScore]);

  return (
    <>
      <h1 className="title">Welcome to Mind Game</h1>
      {currentHighestScore >= topScore && currentHighestScore !== 0 && (
        <h3>Congratulations, You are now top performer!!</h3>
      )}
      <div>
        <h4>Top Highest Score: {topScore}</h4>
        <h4>Your Highest Score: {currentHighestScore}</h4>
      </div>
      <ColorCard />
    </>
  );
};

const mapStateToProps = (state) => ({
  quadObj: state.quadObj,
});
export default connect(mapStateToProps)(Home);
