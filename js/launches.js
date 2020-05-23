
let queryString = `https://api.spacexdata.com/v3/launches?order=desc`;

var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

let params = getParams(window.location.href);
console.log(params.flight_number);

if(params.flight_number) {
    getSpecificLaunch(params.flight_number);
}


function getSpecificLaunch(flightNumber) {
    let specificQueryString = `https://api.spacexdata.com/v3/launches?flight_number=${flightNumber}`;

    fetch(specificQueryString).then((response) => {
        return response.json();
    }).then((data) => {
        let headerInfoMissionName = document.querySelector("#header-mission-name");
        let headerInfoDate = document.querySelector("#header-info-date");
        let launchInfoContainer = document.querySelector("#launch-information-container");

        console.log(data[0]);
        
        let mission_name = data[0].mission_name;
        let launch_date = data[0].launch_date_local.substring(0, 10);
        let rocket_name = data[0].rocket.rocket_name;
        let launch_success = data[0].launch_success;
        let launch_site = data[0].launch_site.site_name;
        let rocket_type = data[0].rocket.rocket_type;

        if(launch_success === null) {
            launch_success = "No information"
        }

        headerInfoMissionName.innerHTML = mission_name;
        headerInfoDate.innerHTML = launch_date;

        launchInfoContainer.innerHTML = 
        `
        <div class="launch-information-box">
                    <div class="launch-info-container__text-container black-text space-top-50px">
                        <p class="launch-info__paragraph bold-text">Mission</p>
                        <p class="launch-info__paragraph">${mission_name}</p>
                    </div>
                    <div class="launch-info-container__text-container black-text space-top-50px">
                        <p class="launch-info__paragraph bold-text">Rocket</p>
                        <p class="launch-info__paragraph">${rocket_name}</p>
                    </div>
                    <div class="launch-info-container__text-container black-text space-top-50px">
                        <p class="launch-info__paragraph bold-text">Launch date</p>
                        <p class="launch-info__paragraph">${launch_date}</p>
                    </div>
                </div>
                <div class="launch-information-box">
                    <div class="launch-info-container__text-container black-text space-top-50px">
                        <p class="launch-info__paragraph bold-text">Launch site</p>
                        <p class="launch-info__paragraph">${launch_site}</p>
                    </div>
                    <div class="launch-info-container__text-container black-text space-top-50px">
                        <p class="launch-info__paragraph bold-text">Rocket type</p>
                        <p class="launch-info__paragraph">${rocket_type}</p>
                    </div>
                    <div class="launch-info-container__text-container black-text space-top">
                        <p class="launch-info__paragraph bold-text">Launch success</p>
                        <p class="launch-info__paragraph">${launch_success}</p>
                    </div>
                </div>
        `
    })
}

getSpecificLaunch();

function getStatistics() {
    fetch(queryString).then((response) => {
        return response.json();
    }).then((data) => {
        let launchStatisticsHeading = document.querySelector(".launch-statistics");
        launchStatisticsHeading.innerHTML = `${data.length} launches`;
        
    })
}
let launchStatisticsHeading = document.querySelector(".launch-statistics");
if(launchStatisticsHeading) {
    getStatistics();
}


function getAllLaunches() {
    fetch(queryString).then((response) => {
        return response.json();
    }).then((data) => {


        let allLaunchesContainer = document.querySelector("#all-launches-container");
        for(i = 0; i < data.length; i++) {
            let launch_details = data[i].details;
            let launch_flight_number = data[i].flight_number;
            let launch_date_year = data[i].launch_year;
            let launch_date_local = data[i].launch_date_local;
            let launch_success = data[i].launch_success;
            let launch_mission_name = data[i].mission_name;
            let launch_rocket_id = data[i].rocket.rocket_id;
            let launch_rocket_name = data[i].rocket.rocket_name;
            let launch_rocket_type = data[i].rocket.rocket_type;
    

            allLaunchesContainer.innerHTML +=
            `<div class="launch-info-container">
                <div class="launch-info-container__text-container">
                    <p class="launch-info__paragraph bold-text">Rocket</p>
                    <p class="launch-info__paragraph">${launch_rocket_name}</p>
                </div>
                <div class="launch-info-container__text-container">
                    <p class="launch-info__paragraph bold-text">Mission</p>
                    <p class="launch-info__paragraph">${launch_mission_name}</p>
                </div>
                <div class="launch-info-container__text-container">
                    <p class="launch-info__paragraph bold-text">Launch Date</p>
                    <p class="launch-info__paragraph">${launch_date_local.substring(0, 10)}</p>
                </div>
                <div class="launch-info-container__text-container">
                    <a class="redirect-button--small" href="launch.html?flight_number=${launch_flight_number}">Read More</a>
                </div>
            </div>`
            
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

let allLaunchesContainer = document.querySelector("#all-launches-container");
if(allLaunchesContainer) {
    getAllLaunches();
}