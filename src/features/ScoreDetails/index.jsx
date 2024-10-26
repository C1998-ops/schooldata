import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import ScoreCard from "../ScoreCard";
import Modal from "../../Components/Modal/Modal";
import axios from "axios";
import { scoreCardUrl } from "../../Components/utils/routes";
import { useFetch } from "../../hooks/useFetch";

const ScoreDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [scoreDetail, setScoreDetail] = useState([]);
  const { data, error, loading } = useFetch(`${scoreCardUrl}/get/AllScores`);

  useEffect(() => {
    if (data) {
      setScoreDetail(data);
    }
  }, [data]);
  if (loading) {
    return (
      <span className="p-2 text-gray-800 font-medium ms-3">loading ...</span>
    );
  }
  if (error) {
    return (
      <span className="p-2 text-red-500 font-medium ms-3">
        Data not availabel at the time.
      </span>
    );
  }
  const onEdit = () => {};
  const onDelete = () => {};
  function handleScoreTable() {
    setOpenModal(true);
  }
  function onclose() {
    setOpenModal(false);
  }

  return (
    <div className="w-full h-full sm:max-h-screen p-2 max-w-lg sm:max-w-screen-md md:max-w-full">
      <h2 className="font-semibold text-2xl">Score Details</h2>
      <div className="w-full sm:min-w-[450px md:min-w-[700px]">
        <span
          className="w-5 h-5 rounded-full p-4 bg-blue-400 float-right cursor-pointer relative mx-12"
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
        <div className="py-2 flex max-w-full sm:max-w-xl md:max-w-screen-lg">
          <Table
            data={scoreDetail ?? []}
            onEdit={onEdit}
            onDelete={onDelete}
            from={"scoreDetails"}
            loader={loading}
          />
        </div>
      </div>

      <Modal isOpen={openModal} onClose={onclose}>
        <ScoreCard />
      </Modal>
    </div>
  );
};

export default ScoreDetails;
