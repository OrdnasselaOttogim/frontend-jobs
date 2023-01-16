import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import MapLeaflet from './map/MapLeaflet';
import axios from "axios";
import BASE_PATH from "../BASE_PATH";
import "./ViewMap.css";


export default function ViewMap(){
    const {id} = useParams();

    const location=useLocation();
    let job ="";
    let jobPosition = [];
    if (location.state){
        job = location.state.job;
        jobPosition = [job.position.lat, job.position.lng];
    }

    const [itineraries, setItineraries] = useState();
    const [home, setHome] = useState();
    const [result, setResult] = useState();
    const [mode, setMode] = useState("walk");
    const [isHomeValid, setIsHomeValid] = useState(true);    

    const loadJob = async () => {
        const result = await axios.get(BASE_PATH + `/api/v1/job/${id}/itinerary?start=${job.address}&end=${home}`, {
            headers : {
              "Authorization" : `Bearer ${localStorage.getItem("jwt_token")}`
            } 
          });
          if (result.data.transit.position.length){
            setIsHomeValid(true);
        }
        else {
            setIsHomeValid(false);
        }
        setResult(result.data);
    };

    useEffect(() => {
        if (result){
            switch (mode){
                case "drive":
                    setItineraries(result.drive);
                    break;
                case "walk":
                    setItineraries(result.walk);
                    break;
                case "transit":
                    setItineraries(result.transit);
                    break;
                default: 
                    setItineraries(result.walk);
                    break; 
            }
        }
    }, [result])

    useEffect(()=>{
        if(result){
            switch (mode){
                case "drive":
                    setItineraries(result.drive);
                    break;
                case "walk":
                    setItineraries(result.walk);
                    break;
                case "transit":
                    setItineraries(result.transit);
                    break;
                default: 
                    setItineraries(result.walk);
                    break; 
            }
        }
    }, [mode])


    function onClick(param){
        setMode(param);
    };

    function onBlurHandler(){
        //send request
        loadJob()
    }

    function onChangeHandler(event){
        setHome(event.target.value);
        setIsHomeValid(true);
    }

    function onKeyDownHandler(event){
        if (event.key === "Enter"){
            onBlurHandler();
        }
    }
    

    return (
    <div className='container'>
        <div className='row my-2 align-items-center'>
            <div className='col-3'>

            <div class="section">
                <div class="sectionTitle">
                    Job address :  
                    </div>
                <div>
                    {job.address}
                    </div>
            </div>
            <div class="section">
                <div class="sectionTitle">
                Your address :
                </div>
                    <input id="inputAddress" type="text" value={home} onChange={onChangeHandler} onBlur={onBlurHandler} onKeyDown={onKeyDownHandler}/>
                    {isHomeValid ? null : <div id="badCity">Please enter a closer address</div>}
            </div>
            <div class="section">
                <div class="sectionTitle">
                    Mode :
                </div>
                <div className='row align-items-center'>
                    <div className='col'>
                        <input type="radio" className="btn-check" name="options" id="walk" autoComplete="off" onClick={() => onClick("walk")} defaultChecked={true}/>
                        <label className="btn btn-primary btn-sm" for="walk">Walk</label>
                    </div>
                    <div className='col'>
                        <input type="radio" className="btn-check" name="options" id="publicTransport" autoComplete="off" onClick={() => onClick("transit")}/>
                        <label className="btn btn-primary btn-sm" for="publicTransport"> 
                                Public transport
                        </label>
                    </div>
                    <div className='col'>
                        <input type="radio" className="btn-check" name="options" id="drive" autoComplete="off" onClick={() => onClick("drive")}/>
                        <label className="btn btn-primary btn-sm" for="drive">Drive</label>
                    </div>
                </div>
                <div class="section"> 
                    <div class="sectionTitle">
                        Time :
                    </div>
                    {itineraries ? Math.round(itineraries.time/60)+"min": "Please enter your address"}
                </div>
                <div class="section">
                    <div class="sectionTitle">
                        Distance :
                    </div>
                    {itineraries ? Math.round(itineraries.dist/100)/10 + "km" : "Please enter your address"}
                </div>
                </div>
            </div>
            <div className='col-9'>
                {itineraries ? <MapLeaflet positions = {itineraries.position} center = {jobPosition} homeAddress = {home}/> : <MapLeaflet positions = {[jobPosition, jobPosition]} center = {jobPosition} homeAddress={""}/> }
            </div>     
    </div>
    <div>
        <Link className="btn btn-primary my-2" to={`/viewJob/${id}`}>Job Details</Link>
        </div>
        </div>
    )
}