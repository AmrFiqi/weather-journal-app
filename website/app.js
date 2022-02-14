
/* Global Variables */
const gen =document.getElementById('generate');
const websiteURL = "https://api.openweathermap.org/data/2.5/weather?zip="
const apiKey = ',us&units=imperial&appid=2a8520cb480639b25387f8aa2730639a';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


//Event listner to listen to the user click for the "Generate button"
gen.addEventListener('click', clickingGenerate);

//Click function
async function clickingGenerate(){
   //const temp=data.main.temp;
   //get the value of the zip code and the feelings the user entered.
   const feelings=document.getElementById('feelings').value;
   const zipCode=document.getElementById('zip').value;
   
   console.log("clicked");
   console.log(zipCode);
   if(!zipCode){  
    alert("No zip code was entered");
   }
   else{
    getWeather(zipCode).then(function(e){
       postData('/postdata',
       {temp:e.main.temp,
         feelings:feelings,
         newDate:newDate,        
      })     
    })
    .then(()=>{
       updateUI();
    })
   }
}


// function to get the weather data
const getWeather= async(zip)=>{
   const request=await fetch(websiteURL+zip+apiKey);
   //Transform into JSON format 
   const transData= await request.json();
   console.log(transData);
   try {
      return transData;
   } catch (error) {
      console.log("Error happened:"+error);
   }
}

const postData= async (url="",data={})=>{
   //Fetch the route from the URL and add the req data
   await fetch('/postdata', {
      method: "POST",
      credentials: 'same-origin',
      headers:{
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
   });
   try {
     // const data= await res.json();
      //console.log(data)
      return ;
   } catch (error) {
      //Log an error and say which error is it
      console.log("Error:"+error)
   }
}
//Show on page the data we took and update the UI with it
async function updateUI(){
   const request= await fetch("/getdata");
   const allData = await request.json();
   try {
      document.getElementById('temp').innerHTML = "Temprature is: "+Math.round(allData.temp)+ ' degrees';
      document.getElementById('content').innerHTML = "Feels: "+allData.feelings;  
      document.getElementById("date").innerHTML ="Date: "+allData.newDate;
      console.log(date)
   } catch (error) {
      //Log an error and say which error is it
      console.log("Error:"+error)
   }
}
