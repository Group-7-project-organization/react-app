import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import Constants from "../Constants.json";


function V3() {



    const [globalData, setGlobalData] = useState({})
    const getGlobalData = () => {
        axios.get(Constants.API_ADDRESS + "/v3global").then((response) => {
            console.log(response.data);
            setGlobalData(response.data);
        })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getGlobalData();
    }, []);


    const [carbonData, setCarbonData] = useState({})
    const getCarbonData = () => {
        axios.get(Constants.API_ADDRESS + "/v3carbon").then((response) => {
            console.log(response.data);
            setCarbonData(response.data);
        })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getCarbonData();
    }, []);

    
    const data = {
        datasets: [
            {
                showLine: true,
                label: "Carbondata",
                type: 'line',
                data: carbonData,
                borderColor: "rgb(255, 0, 0)",
                backgroundColor: "rgb(255, 0, 0)",
                parsing: {
                    xAxisKey: "yearC",
                    yAxisKey: "carbondata",
                },
                pointRadius: false,
               xAxisID:"x",
            },
            {
                label: "Globaldata",
                type: 'line',
                data: globalData,
                borderColor: "rgb(7, 0, 0)",
                backgroundColor: "rgb(7, 0, 0)",
                parsing: {
                    xAxisKey: "timeG",
                    yAxisKey: "global",
                },
                pointRadius: false,
                yAxisID: "y1",
                xAxisID:"x2",
                

            },
   
        ],
    };

    const optionsV3 = {
        responsive: true,
        sacked: false,
        plugins: {
            legend:
            {
                position: "top",
            },
                    
            title: {
                display: true,
                text: "Evolution of global temperature over the past two million years",
                font: {
                    size: 20
                },
            },
        },

         scales: {
            y:
            {
                type: 'linear',
                title: {
                    display: true,
                    text: "Carbon",
                },
                position: "left",



            },
            y1: {
                type: "linear",
                title: {
                    display: true,
                    text: "Global",
                },
                position: "right",
                grid: {
                    drawOnChartArea: false,
                },

            },
      

            x: {
                type: "linear",
                time: {
                    unit: "year"
                },

                title: {
                    display: true,
                    text: 'Thousands years before present'
                },

                reverse: true,
            },
            x1: {
                display: false,
            },

        },

    };





    return (
        <>
            <div className="V3">
                <h2> Evolution of global temperature over the past two million years</h2>
                <div><Line data={data} options={optionsV3} alt="chart"></Line></div>
            </div>
            <div style={{ width: "24rem" }}>
            <div>
            <h5 className="card-title">Description</h5>
          <p className="card-text">This chart shows Evolution of global temperature over the past two million years.</p>
          <p> The chart shows also Human Evolution and Activities that are relevant to Co2 and temperature changes.</p>
            </div>
            <h6 className="card-subtitle mb-2 text-muted">Sources:</h6>
        <p> <a href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf/" target="_blank" rel="noopener noreferrer" className="card-link">Description </a></p>
        <p> <a href="http://carolynsnyder.com/publications.php" target="_blank" rel="noopener noreferrer" className="card-link">Datasets</a></p>
        <p> <a href="https://www.southampton.ac.uk/~cpd/history.html" target="_blank" rel="noopener noreferrer" className="card-link">Human Evolution</a></p>
            
            </div>
        </>
    );
}

export default V3;