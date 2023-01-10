
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import MapLeaflet from './map/MapLeaflet';

export default function ViewJob(){
    const {id} = useParams();

    const location=useLocation();
    const [itineraries, setItineraries] = useState(location.state.itineraries.walk);
    console.log("type");
    console.log(typeof itineraries.position);

    console.log(itineraries.position);
    const [mode, setMode] = useState("walk");
    useEffect(() => {
        //setItineraries(location.state.itineraries)
        console.log("location", location.state.itineraries)
    },[])

    useEffect(()=>{
        switch (mode){
            case "drive":
                setItineraries(location.state.itineraries.drive);
                break;
            case "walk":
                setItineraries(location.state.itineraries.walk);
                break;
            case "transit":
                setItineraries(location.state.itineraries.transit);
                break;
            default: 
                setItineraries(location.state.itineraries.walk);
                break

        }
    }, [mode])


    function onClick(param){
        setMode(param);
    };

    // const [detailsMap, setDetailsMap] = useState({
    //     time: 0,
    //     distance: 0,
    //     start: [],
    //     end: [],
    //     positions: []
    // });

    // useEffect(() => {
    //     loadJob()
    // }, []);


    // const loadJob = async () => {
    //     const result = await axios.get(`http://localhost:8082/api/v1/job/${id}`);
    //     setDetailsMap(result.data);
    // };

    return (
    <div className='container'>
        <div className='row my-3'>
            <div className='col-3 align-self-center'>
                <div className='row'>
                    <div className='col-4'>
                        <input type="radio" className="btn-check" name="options" id="walk" autoComplete="off" onClick={() => onClick("walk")} defaultChecked={true}/>
                        <label className="btn btn-primary" for="walk">Walk</label>
                    </div>
                    <div className='col-4'>
                        <input type="radio" className="btn-check" name="options" id="publicTransport" autoComplete="off" onClick={() => onClick("transit")}/>
                        <label className="btn btn-primary" for="publicTransport">Public transport</label>
                    </div>
                    <div className='col-4'>
                        <input type="radio" className="btn-check" name="options" id="drive" autoComplete="off" onClick={() => onClick("drive")}/>
                        <label className="btn btn-primary" for="drive">Drive</label>
                    </div>
                </div>
                <div className='card'>
                    <div> Time : {Math.round(itineraries.time/60)} min</div>
                    <div> Distance : {Math.round(itineraries.dist/100)/10} km</div>
                </div>
                </div>
            <div className='col-9'>
                {/* <Map props = {{positions:itineraries.position}}/> */}
                <MapLeaflet positions = {itineraries.position}/>
            </div>     
    </div>
    <div>
        <Link className="btn btn-primary my-2" to={`/viewJob/${id}`}>Job Details</Link>
        </div>
        </div>
    )
}
