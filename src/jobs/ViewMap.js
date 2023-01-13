
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import MapLeaflet from './map/MapLeaflet';
import axios from "axios";
import BASE_PATH from "../BASE_PATH";
import "./ViewMap.css";


export default function ViewMap(props){
    const {id} = useParams();

    const location=useLocation();
    let job ="";
    let jobPosition = [];
    if (location.state){
        job = location.state.job;
        jobPosition = [job.position.lat, job.position.lng];
    }
    let centerBis = jobPosition;
    const [itineraries, setItineraries] = useState();
    const [home, setHome] = useState();
    const [result, setResult] = useState();
    const [center, setCenter] = useState();
    const [mode, setMode] = useState("walk");
    const [isHomeValid, setIsHomeValid] = useState(true);    

    const loadJob = async () => {
        const result = await axios.get(BASE_PATH + `/api/v1/job/${id}/itinerary?start=${job.address}&end=${home}`, {
            headers : {
              "Authorization" : `Bearer ${localStorage.getItem("jwt_token")}`
            } 
          });
          if (result.data.transit.position.length){
            setCenter([(result.data.transit.position[0].lat+result.data.transit.position[result.data.transit.position.length-1].lat)/2, (result.data.transit.position[0].lng+result.data.transit.position[result.data.transit.position.length-1].lng)/2])
            setIsHomeValid(true);
        }
        else {
            setCenter(jobPosition);
            setIsHomeValid(false);
        }
        setResult(result.data);
    };

    useEffect(() => {
        if (result)
            setItineraries(result.walk);
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
                <form>
                    <input id="inputAddress" type="text" value={home} onChange={onChangeHandler} onBlur={onBlurHandler}/>
                    {isHomeValid ? null : <div id="badCity">Please enter a closer address</div>}
                </form>
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
                {itineraries ? <MapLeaflet positions = {itineraries.position} center = {center} homeAddress = {home}/> : <MapLeaflet positions = {[jobPosition, jobPosition]} center = {jobPosition} homeAddress={""}/> }
            </div>     
    </div>
    <div>
        <Link className="btn btn-primary my-2" to={`/viewJob/${id}`}>Job Details</Link>
        </div>
        </div>
    )
}
