import React, { useEffect, useState } from "react";
import Table from "../Table";
import ScoreCard from "../ScoreCard";
import Modal from "../Modal/Modal";
import axios from "axios";
import { scoreCardUrl } from "../utils/routes";

const ScoreDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [scoreDetail, setScoreDetail] = useState([]);
  const onEdit = () => {};
  const onDelete = () => {};
  function handleScoreTable() {
    setOpenModal(true);
  }
  function onclose() {
    setOpenModal(false);
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${scoreCardUrl}/get/AllScores`);
        if (data !== null) {
          setScoreDetail(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="w-full p-4 min-w-[550px] md:max-w-full">
      <h1 className="text-2xl font-semibold">Score Details</h1>
      <div className="min-w-full">
        <div className="w-full float-end">
          <span
            className="w-5 h-5 rounded-full p-4 bg-blue-600 float-right cursor-pointer relative"
            onClick={handleScoreTable}
          >
            <svg
              height="25"
              viewBox="0 0 24 24"
              width="30"
              className="absolute top-1 right-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="heroicon-ui "
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </span>
        </div>
      </div>
      <Table
        data={scoreDetail}
        onEdit={onEdit}
        onDelete={onDelete}
        from={"scoreDetails"}
      />
      <Modal isOpen={openModal} onClose={onclose}>
        <ScoreCard />
      </Modal>
    </div>
  );
};

export default ScoreDetails;
