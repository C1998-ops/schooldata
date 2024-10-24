import React from "react";
import { Link } from "react-router-dom";
import Error from "../../Components/assets/404error.png";

const PageNotFound = () => {
  return (
    <React.Fragment>
      <div className="error_main w-screen h-screen" style={{ height: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="flex sm:max-w-screen-sm md:max-w-screen-lg">
            <img
              src={Error}
              size={20}
              style={{ marginTop: "50px" }}
              alt="page not found"
            />
          </div>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "0px",
            textAlign: "center",
          }}
          className="error_text"
        >
          <div>
            <h1>
              <span style={{ color: "#da3450" }}>OOPS ! </span>PAGE NOT BE FOUND
            </h1>
            <p style={{ width: "100%", marginTop: "20px" }}>
              Sorry but The page your looking for does not exit, have been
              removed .
            </p>
            <p style={{ marginTop: "10px" }}>
              name changed or is temporarily unavailable
            </p>
          </div>
        </div>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            style={{ backgroundColor: "#da3450" }}
            className="px-6 py-2 rounded-md shadow-lg text-sm font-medium"
          >
            <Link
              to="/signin"
              style={{ color: "white", textDecoration: "none" }}
            >
              Go to Home Page
            </Link>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageNotFound;
