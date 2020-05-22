
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

                // Get todays date in all numbers format to compare to launch date if launch has already happened
                let date = new Date();
                let dateToday = `${date.getFullYear()}${("0" + date.getMonth()).slice(-2)}${("0" + date.getDate()).slice(-2)}`;
                // Get the launch date local from the spacex Api, and strip it to only contain ex. 2020-04-13
                let launch_date = data[i].launch_date_local.substring(0, 10);
                // While launch date includes - remove them so its all numbers and ready to be compared to todays date.
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
                    let launch_flight_number = data[i].flight_number;
                    let launch_mission_name = data[i].mission_name;
                    let launch_rocket_name = data[i].rocket.rocket_name;
                    //let launch_details = data[i].details;
                    // let launch_date_year = data[i].launch_year;
                    // let launch_success = data[i].launch_success;
                    // let launch_rocket_id = data[i].rocket.rocket_id;
                    // let launch_rocket_type = data[i].rocket.rocket_type;

                    // Get the latest launch container and fill it with data from the SpaceX api.
                    let latestLaunchList = document.querySelector("#latest-launches-container");
                    latestLaunchList.innerHTML += `<div class="latest-launches-card">
                        <div class="latest-launch-card__text-container">
                            <p class="latest-launches__text bold-text">Mission</p>
                            <p class="latest-launches__text">${launch_mission_name}</p>
        
                            <p class="latest-launches__text bold-text">Rocket</p>
                            <p class="latest-launches__text">${launch_rocket_name}</p>
        
                            <p class="latest-launches__text bold-text">Launch date</p>
                            <p class="latest-launches__text">${data[i].launch_date_local.substring(0, 10)}</p>
                        </div>
                        <a class="redirect-button--small space-top" href="launch.html?flight_number=${launch_flight_number}">Read more</a>
                    </div>`;

                }

                // Breaks out of the loop after 3 latest launched launches have been retrived.
                if(counter >= 3) {
                    finishedLoop = true;
                    break;
                }
            }
        }
    });
}


// Make sure unneccessary code doesnt run if its not needed
let latestLaunchesContainerExists = document.querySelector("#latest-launches-container");
if(latestLaunchesContainerExists) {
    getLatestLaunches();
}
