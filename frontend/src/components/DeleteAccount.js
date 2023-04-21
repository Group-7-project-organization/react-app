import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Constants from './Constants.json';

export default function DeleteAccount() {

  //get the username from the local storage
  const username = localStorage.getItem("username");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [changeDeleteState, setChangeDeleteState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");


  //function to handle delete
  const handleDelete = async (event) => {
    setErrorMessage("");

    if (password === "") {
      setErrorMessage("Password can't be empty")
    }
    else {
      event.preventDefault();

      setChangeDeleteState("processing");

      //send the delete request to the backend
      await axios.delete(Constants.API_ADDRESS + "/deleteaccount", {
        data: {
          username: username,
          password: password,
        }
      }).then(response => {
        console.log(response);
        console.log(response.config.url);
        setChangeDeleteState("success");
        setTimeout(() => {
          setChangeDeleteState("idle")
          navigate("/", { replace: true });
        }, 1500);
      }).catch(error => {
        setChangeDeleteState("error");
        setTimeout(() => setChangeDeleteState("idle"), 1500);
        setErrorMessage("Check that you have entered correct username and password");
        console.log(error);

      })
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage("");
    }, 1500);

    return () => clearTimeout(timeout);
  }, [errorMessage]);

  let deleteControls = null;
  switch (changeDeleteState) {
    case "idle":
      deleteControls = <button type="submit">Delete Account</button>
      break;

    case "processing":
      deleteControls = <span style={{ color: 'blue' }}>Processing delete...</span>
      break;

    case "success":
      deleteControls = <span style={{ color: 'green' }}>Account deleted</span>
      break;

    case "error":
      deleteControls = <span style={{ color: 'red' }}>Error</span>
      break;

    default:
      deleteControls = <button type="submit">Go back</button>
  }

  return (
    <>
      <div className="delete">
        <div>
          <h4>Delete Account</h4>
          <form onSubmit={handleDelete}>
            <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <div>
              <span style={{ color: 'red' }}>{errorMessage}</span>
            </div>
            <div>
              {
                deleteControls
              }
            </div>
          </form>
          <p> <Link to="/">Don't want to delete account?</Link></p>
        </div>
      </div>
    </>
  );
}

