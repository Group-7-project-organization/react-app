
import React, { useState, useEffect, useRef } from 'react';
import { Doughnut, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "chartjs-adapter-moment";
import Constants from "../Constants.json";

import './Visu.css';


function V5() {

    const [data1, setData] = useState([]);
    const [energyData, setEnergyData] = useState([]);
    const [industrialData, setIndustrialData] = useState([]);
    const [wasteData, setWasteData] = useState([]);
    const [afoluData, setAfoluData] = useState([]);
    const [selectedSector, setSelectedSector] = useState();

    const chartRef = useRef();

    useEffect(() => {
        fetch(Constants.API_ADDRESS + "/v5all")
            .then(response => response.json())
            .then(data => {
                setSelectedSector({ data: data, label: "All sectors" })
                console.log(data);
                setData(data);
                if (data.length === 0) {
                    alert("Not data found");
                }
            }
            );
    }, []);

    useEffect(() => {
        fetch(Constants.API_ADDRESS + "/v5energy")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setEnergyData(data);
                if (data.length === 0) {
                    alert("Not data found");
                }
            }
            );
    }, []);

    useEffect(() => {
        fetch(Constants.API_ADDRESS + "/v5industrial")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setIndustrialData(data);
                if (data.length === 0) {
                    alert("Not data found");
                }
            }
            );
    }, []);

    useEffect(() => {
        fetch(Constants.API_ADDRESS + "/v5waste")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setWasteData(data);
                if(data.length === 0) {
                    alert("Not data found");
                }
            }
            );
    }, []);

    useEffect(() => {
        fetch(Constants.API_ADDRESS + "/v5afolu")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAfoluData(data);
                if(data.length === 0) {
                    alert("Not data found");
                }
            }
            );
    }, []);

    const onClick = (event) => {
        if (selectedSector === null || selectedSector.label === "All sectors") {

            let element = getElementAtEvent(chartRef.current, event)

            if (element[0].index === 0) {
                setSelectedSector({ data: energyData, label: "Energy" })
            }
            else if (element[0].index === 1) {
                setSelectedSector({ data: industrialData, label: "Industrial" })
            }
            else if (element[0].index === 2) {
                setSelectedSector({ data: wasteData, label: "Waste" })
            }
            else if (element[0].index === 3) {
                setSelectedSector({ data: afoluData, label: "Agriculture, Forestry & Land use (Afolu)" })
            }
        }
        return null;
    }




    const data = {
        labels: selectedSector ? selectedSector.data.map(item => item.sector) : [],
        datasets: [
            {
                data: selectedSector ? selectedSector.data.map(item => item.share) : [],
                backgroundColor: [
                    "#9ACD32",
                    "#ADFF2F",
                    "#90EE90",
                    "#00FA9A",
                    "#00FF7F",
                    "#3CB371",
                    "#2E8B57",
                    "#008000",
                    "#00FFFF",
                    "#00CED1",
                    "#48D1CC",
                    "#00BFFF",
                    "#7B68EE",
                    "#B0C4DE",
                    "#4682B4",
                    "#4169E1",
                    "#0000FF",
                    "#0000FF",
                ],
            }
        ]
    };

    const options = {
        responsive: true,
        aspectRatio: 5,
        elements: {
            arc: {
                borderWidth: 0,
                hoverOffset: 20,
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12
                    }
                }
            }
        },
        title: {
            display: true,
            text: "CO2 emissions by sectors",
            font: {
                size: 20,
            },
            className: 'chart-title',
        },
    }

    return (
        <div className="child">
            <div className="containter-fluid">
                <h2>{selectedSector ? selectedSector.label : "All sectors"}</h2>
            </div>
            <div className="container-fluid">
                <Doughnut data={data} options={options} ref={chartRef} onClick={onClick} />
                <button onClick={() => setSelectedSector({ data: data1, label: "All sectors" })}>Go back</button>
            </div>
            <div className="card mt-4" style={{ width: "24rem" }}>
                <div className="card-body">
                    <h5 className="card-title>">Description</h5>
                    <p ClassName="card-text"> This chart shows the CO2 emissions by sectors. The data is from 2018 and is based on the World Resources Institute (WRI) dataset. By clicking on a sector, you can see the CO2 emissions by country for that sector. </p>
                    <p>To reset the chart, click on the "Go back" button.</p>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">Sources: </h6>
                <p> <a href="https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector" target="_blank" rel="noopener noreferrer" className="card-link">Description</a></p>
                <p> <a href="https://ourworldindata.org/uploads/2020/09/Global-GHG-Emissions-by-sector-based-on-WRI-2020.xlsx" target="_blank" rel="noopener noreferrer" className="card-link">Dataset</a></p>
            </div>

        </div>
    );
} export default V5;