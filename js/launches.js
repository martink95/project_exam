
let queryString = `https://api.spacexdata.com/v3/launches?order=desc`;

function getAllLaunches() {
    fetch(queryString).then((response) => {
        return response.json();
    }).then((data) => {

        for(i = 0; i < 10; i++) {
            let launch_details = data[i].details;
            let launch_flight_number = data[i].flight_number;
            let launch_date_year = data[i].launch_year;
            let launch_date_local = data[i].launch_date_local;
            let launch_success = data[i].launch_success;
            let launch_mission_name = data[i].mission_name;
            let launch_rocket_id = data[i].rocket.rocket_id;
            let launch_rocket_name = data[i].rocket.rocket_name;
            let launch_rocket_type = data[i].rocket.rocket_type;
    
            console.log(`-----Mission id ${i}-----`);
            
            console.log("details: " + launch_details);
            console.log("flight number: " + launch_flight_number);
            console.log("year: " + launch_date_year);
            console.log("date: " + launch_date_local);
            console.log("success: " + launch_success);
            console.log("Mission name: " + launch_mission_name);
            console.log("rocket id: " + launch_rocket_id);
            console.log("rocket name: " + launch_rocket_name);
            console.log("rocket type: " + launch_rocket_type);
            
        }

        
        
        
        
    });
}


function getLatestLaunches() {
    fetch(queryString).then((response) => {
        return response.json();
    }).then((data) => {
        
        let counter = 3;
        let listLength = data.length-1;

        for(i = 0; i < counter; i++) {
            
            let launch_details = data[i].details;
            let launch_flight_number = data[i].flight_number;
            let launch_date_year = data[i].launch_year;
            let launch_date_local = data[i].launch_date_local;
            let launch_success = data[i].launch_success;
            let launch_mission_name = data[i].mission_name;
            let launch_rocket_id = data[i].rocket.rocket_id;
            let launch_rocket_name = data[i].rocket.rocket_name;
            let launch_rocket_type = data[i].rocket.rocket_type;
    
            console.log(`-----Mission id ${i}-----`);
            
            console.log("details: " + launch_details);
            console.log("flight number: " + launch_flight_number);
            console.log("year: " + launch_date_year);
            console.log("date: " + launch_date_local);
            console.log("success: " + launch_success);
            console.log("Mission name: " + launch_mission_name);
            console.log("rocket id: " + launch_rocket_id);
            console.log("rocket name: " + launch_rocket_name);
            console.log("rocket type: " + launch_rocket_type);
            
        }

        
        
        
        
    });
}
getLatestLaunches();