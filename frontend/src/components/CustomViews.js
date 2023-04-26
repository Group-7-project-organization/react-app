import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from "chart.js";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Constants from './Constants.json';
import './visualisations/Visu.css';

import V1 from "./visualisations/V1";
import V2 from "./visualisations/V2";
import V3 from "./visualisations/V3";
import V4 from './visualisations/V4';
import V5 from './visualisations/V5';



export default function CustomViews() {
  const username = localStorage.getItem('username');
  const [data, setData] = useState([]);
  const [parallel, setParallel] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //method to get data from backend
  useEffect(() => {
    axios.get(Constants.API_ADDRESS + '/customviews', {
      params: {
        username: username
      }
    }).then(response => {
      console.log(response.data);
      setData(response.data);
      console.log(response.data[0].parallel);
      if (response.data.length === 0) {
        setErrorMessage("No custom views found");
      }
    }).catch(error => {
      if (error.response.status === 404 || error.response.status === 500) {
        setErrorMessage("Something went wrong, return later")
        console.log(error);
      }
    });
  }, []);

  //method to delete custom view
  const deleteCustomView = (id) => {
    axios.delete(Constants.API_ADDRESS + '/customviews/delete', { data: { id: id } })
      .then(response => {
        console.log("OK");
        window.location.reload();
        setSuccessMessage("Custom view deleted");
        setTimeout(() => {
          setSuccessMessage("");
        }, 1500); 
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  //handles the data, what to show
  const getCustomViews = () => {
    return data.map((view, index) => {
      const views = [];
      if (view.visu1) {
        views.push(
          <div key={`v${index}-1`}>
            <V1 textv1={view.textv1} />
            <p className="text">{view.textv1}</p>
          </div>
        );
      }

      if (view.visu2) {
        views.push(
          <div key={`v${index}-2`}>
            <V2 textv2={view.textv2} />
            <p className="text">{view.textv2}</p>
          </div>
        );
      }

      if (view.visu3) {
        views.push(
          <div key={`v${index}-3`}>
            <V3 textv3={view.textv3} />
            <p className="text">{view.textv3}</p>
          </div>
        );
      }

      if (view.visu4) {
        views.push(
          <div key={`v${index}-4`}>
            <V4 textv4={view.textv4} />
            <p className="text">{view.textv4}</p>
          </div>
        );
      }

      if (view.visu5) {
        views.push(
          <div key={`v${index}-5`}>
            <V5 textv5={view.textv5} />
            <p className="text">{view.textv5}</p>
          </div>
        );
      }

      return (
        <div className="grid-container" key={`view-${index}`}>
          <div className="link">
            <a href={`http://localhost:3000/custom/${view.url}`} target="_blank" rel="noreferrer">This custom view can also be found here</a>
          </div>
          {views}
  
          <form className='button-container' >
          <div className="delete-button">
          <Button onClick={() => deleteCustomView(view.id)}>Delete</Button>
    </div>
    {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
    </form>
          {index === data.length - 1 ? (
            <h2>End of custom views</h2>) : <h1>Custom view changes here to another one</h1>}
        </div>
      );
    });
  };

  //method to get layout
  const getLayout = () => {
    const containerClass = parallel ? "grid-container parallel" : "grid-container";
    const containerStyle = parallel ? { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" } : { width: "100%" };
    return (
      <div className={containerClass} style={containerStyle}>
        {getCustomViews()}
      </div>
    );
  };

  return (
    <>
      <div>
        <span style={{ color: 'red' }}>{errorMessage}</span>
      </div>
      <div>
        <h3>Custom views of user: {username}</h3>
        <div>
          {getLayout()}
        </div>
      </div>
    </>
  );

}