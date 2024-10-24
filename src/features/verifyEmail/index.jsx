import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import success_popper from "../../Components/assets/popper.svg";
import { host } from "../../Components/utils/routes";
import axios from "axios";
const VerifyEmailAccount = () => {
  const { token } = useParams();
  const [msg, setMsg] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const [poper, setPoper] = useState(false);

  useEffect(() => {
    // console.log(token);
    const controller = new AbortController();
    axios

      .get(host + "/account/verification/" + token, {
        signal: controller.signal,
      })
      .then((response) => {
        // console.log(response);
        setPoper(true);
        setMsg(response?.data?.url);
      })

      .catch((error) => {
        console.log(error);
        if (error.response) {
          //destructing to get response
          const { data } = error.response;
          // console.log(type);

          switch (data.type) {
            case "INVALID-INPUT":
              setMsg(data.message);
              console.error(data.message);
              break;
            case "NOT-FOUND":
              setMsg(data.message);
              console.error(data.message);
              break;
            case "TOKEN-EXPIRED":
              setMsg(data.message);
              setTokenExpired(true);

              console.error(data.message);
              break;
            case "USER-NOT-FOUND":
              setMsg(data.message);
              console.error(data.message);
              break;
            case "ALREADY-VERIFIED":
              setMsg(data.message);
              console.log(data.message);
              break;
            case "SERVER-ERROR":
              setMsg(data.message);
              console.error(data.message);
              break;
            default:
              console.error("An unknown error occurred");
          }
        }
      });
    return () => {
      controller.abort();
    };
  }, []);
  //   const RegenerateToken = async () => {
  //     try {
  //       // console.log(token);

  //       await axios
  //         .put(`${API_AUTH_URL}request-new/confirm/${token}`, {
  //           headers: "Content-Type=text/html",
  //         })
  //         .then((response) => {
  //           console.log("pls Check u r mail");
  //           setMsg(response?.data?.message);
  //           setPoper(true);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           const { data } = error.response;
  //           switch (data.type) {
  //             case "ALREADY-VERIFIED":
  //               // console.log("user already verified");
  //               setPoper(true);
  //               setMsg(data.message);
  //               setTokenExpired(false);

  //               break;
  //             case "TOKEN-NOT-EXPIRED":
  //               console.log("previous token still valid ");
  //               break;
  //             default:
  //               console.log("error occured during token creation");

  //               break;
  //           }
  //         });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col mx-auto w-full justify-center items-center">
        {poper && (
          <div className="max-w-lg overflow-hidden">
            <img
              src={success_popper}
              alt="account verified"
              className="bg-cover w-full"
              width={200}
              height={200}
            />
          </div>
        )}
        <span className="serv_resp">{msg}</span>
        {tokenExpired && (
          <button type="button">Regenerate Activation Link</button>
        )}

        <p className="text-gray-500 font-medium text-lg">
          pls login to use our services
        </p>
        <Link to={"/signin"} style={{ textDecoration: "none" }}>
          <button type="button" className="bg-blue-300 p-2 text-sm rounded-sm">
            LOGIN
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailAccount;
