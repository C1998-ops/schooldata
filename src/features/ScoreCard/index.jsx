import React, { useState } from "react";
import ScoreTable from "./ScoreTable";
import ToggleButton from "../../Components/ToggleButton";
import axios from "axios";
import { scoreCardUrl } from "../../Components/utils/routes";

const ScoreCard = () => {
  const info = {
    ScoreCard_Title: "",
    isActive: false,
  };
  const [carddata, setCarddata] = useState(info);
  const [scoreDetails, setScoreDetails] = useState({
    scoreCardTitle: "",
    scoreCardIsActive: "",
    scoreItems: [],
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "text") {
      setCarddata((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
      setScoreDetails((prev) => {
        return { ...prev, scoreCardTitle: value };
      });
    } else {
      setCarddata((prev) => {
        return { ...prev, isActive: checked };
      });
      setScoreDetails((prev) => ({ ...prev, scoreCardIsActive: checked }));
    }
  };
  const addScoreItem = (newItem) => {
    setScoreDetails((prevDetails) => ({
      ...prevDetails,
      scoreItems: [...prevDetails.scoreItems, newItem],
    }));
  };
  const handleScoreSubmit = async () => {
    try {
      const { data, status } = await axios.post(
        `${scoreCardUrl}/scoredetail/create`,
        scoreDetails,
        { headers: { "Content-Type": "application/json" } }
      );
      if (status === 201 && data.success) {
        console.log("success", data.success);
      }
    } catch (error) {
      if (error.response === 400) {
        console.error(error.error);
      }
    }
  };
  return (
    <div className="max-w-4xl p-4 flex flex-col max-h-full">
      <h1 className="text-2xl font-semibold">Score Card</h1>
      <div className="flex flex-row items-center justify-between">
        <div className="w-full md:max-w-screen-md">
          <label htmlFor="title" className="flex flex-col text-gray-500">
            Score Card Title
            <input
              type="text"
              name="ScoreCard_Title"
              id="title"
              value={carddata.ScoreCard_Title}
              placeholder="enter your title"
              onChange={handleChange}
              className="w-full max-w-fit md:max-w-sm text-inherit px-4 py-2  border rounded-sm focus:outline-blue-300"
            />
          </label>
        </div>
        <div className="toggle-button flex flex-col">
          <span className="font-semibold text-xs text-gray-600">ISACTIVE</span>
          <ToggleButton onChange={handleChange} />
        </div>
      </div>
      <ScoreTable scoreDetail={scoreDetails} addItem={addScoreItem} />
      <button
        type="submit"
        className="w-full md:max-w-full p-1 bg-blue-400 hover:bg-blue-500 focus:ring-blue-700 font-bold text-white rounded-sm"
        onClick={handleScoreSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default ScoreCard;
