import React from "react";
import axios from 'axios';
import './Location.css';

class Location extends React.Component{

    constructor(props){
        super(props);
        this.state={
            display_name:"",
            lat:"",
            lon:"",
            // error:"Unable to geocode", //with the comment below
            errFlag:false,
            mapFlag:false
        }
    }

    getLocationData= async (event) => {
        event.preventDefault();
        const cityName= event.target.city.value;

        const key='pk.d2d5cb3611372e2e9aa72978f1e420e8';
        const URL =`https://us1.locationiq.com/v1/search?key=${key}&q=${cityName}&format=json`;
        

        try{

        let resResult= await axios.get(URL);
        this.setState({
            display_name: resResult.data[0].display_name,
            lat: resResult.data[0].lat,
            lon: resResult.data[0].lon,
            mapFlag:true
        })
    }
    catch{
        this.setState({
            errFlag:true
        })
    }

    }




    render(){
        return(
            <div>
                <h1 class="header"> City Explorer</h1>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <form onSubmit={this.getLocationData} class="form">
                    <input type="text" name="city" placeholder="Enter a name"/>
                    <button type="submit">Explore!</button>
                </form>
                <br></br>
                <h3 class="header">Display name: {this.state.display_name}</h3>
                <br></br>
                <h5 class="header">lon: {this.state.lon}</h5>
                <h5 class="header">lat: {this.state.lat}</h5>
                <br></br>
                <br></br>
                {this.state.mapFlag && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.d2d5cb3611372e2e9aa72978f1e420e8&center=${this.state.lat},${this.state.lon}`} alt="mapImg"/>}
                {/* {this.state.errFlag && <h4>error:{this.state.error}</h4>} */}
                {this.state.errFlag && <h4 class="header">error:Unable to geocode</h4>}
            </div>
        )
    }
}

export default Location;