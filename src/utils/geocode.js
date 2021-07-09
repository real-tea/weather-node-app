const request = require('request');

const geocode = (address,callback) =>{
    const url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiYWthc2gtc2luZ2giLCJhIjoiY2txaXhtYTJlMDl5bzJucGQxN2dqOWQweiJ9._VXQUxpJ_0B6Wstv2BGzXg"
    request({ url:url2,json:true},(error,response)=>{
        if(error){
            console.log("error encountered");
        }
        else if(response.body.features.length == 0){
           console.log("location not found");
        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                place:response.body.features[0].place_name

            });

        }
    })

}

module.exports = geocode;