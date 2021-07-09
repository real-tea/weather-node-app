const request = require("request");

const forecast=(latitude,longitude,callback)=>{
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+latitude+"%2C"+longitude+"%20?unitGroup=metric&key=N6NQVNV2ECKTJUP7UWQZ7B85J";
    request({url:url,json:true},(error,response)=>{
        if(error){ 
                callback("error encountered",undefined);
            }
        
        else{      
            callback(undefined, response.body.days[0].temp + '  celcius is the temprature currently, '+response.body.days[0].description+' the chances to rain : '+response.body.days[0].humidity+'%')
        

        }
    }) 
}

module.exports = forecast;