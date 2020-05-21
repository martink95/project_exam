
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
        
        let listLength = data.length-1;
        
        let finishedLoop = false;
        let counter = 0;
        while(!finishedLoop) {
            for(i = 0; i < listLength; i++) {

                let date = new Date();
                let dateToday = `${date.getFullYear()}${("0" + date.getMonth()).slice(-2)}${("0" + date.getDate()).slice(-2)}`;
    
                let launch_date = data[i].launch_date_local;
                launch_date = launch_date.substring(0, 10);
                while(launch_date.includes("-")) {
                    launch_date = launch_date.replace("-","");
                    if(!launch_date.includes("-")) {
                        break;
                    }
                }
                
                // Check if todays date is higher than the launch date value.
                // To check if the launch has been made or is upcoming.
                if(dateToday >= launch_date){
                    counter += 1;
                    


                    // Get the Values needed for the website.
                    let launch_details = data[i].details;
                    let launch_flight_number = data[i].flight_number;
                    let launch_date_year = data[i].launch_year;
                    let launch_success = data[i].launch_success;
                    let launch_mission_name = data[i].mission_name;
                    let launch_rocket_id = data[i].rocket.rocket_id;
                    let launch_rocket_name = data[i].rocket.rocket_name;
                    let launch_rocket_type = data[i].rocket.rocket_type;
                    console.log("details: " + launch_details);
                    console.log("flight number: " + launch_flight_number);
                    console.log("date: " + launch_date);
                    console.log("year: " + launch_date_year);
                    console.log("success: " + launch_success);
                    console.log("Mission name: " + launch_mission_name);
                    console.log("rocket id: " + launch_rocket_id);
                    console.log("rocket name: " + launch_rocket_name);
                    console.log("rocket type: " + launch_rocket_type);
                }

                // Breaks out of the loop after 3 latest launched launches have been retrived.
                if(counter >= 3) {
                    finishedLoop = true;
                    break;
                }
                
                /*
                
                let launch_flight_number = data[i].flight_number;
                let launch_date_year = data[i].launch_year;
                let launch_date_local = data[i].launch_date_local;
                let launch_success = data[i].launch_success;
                let launch_mission_name = data[i].mission_name;
                let launch_rocket_id = data[i].rocket.rocket_id;
                let launch_rocket_name = data[i].rocket.rocket_name;
                let launch_rocket_type = data[i].rocket.rocket_type;
        
                console.log(`-----Mission id ${i}-----`);
                
                
                */
            }
        }
        
    });
}
getLatestLaunches();