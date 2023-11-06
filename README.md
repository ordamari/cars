## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Images](#images)
* [Features](#features)
* [Setup](#setup)
 
## General info
This is a simple and responsive car match app developed using Angular. It allows potential car buyers to find their perfect car match based on their personal preferences. The application consists of two main views: the Landing Page and the Dashboard.<br/>

At the beginning of the data setup process for the application, I populate the local storage with mock data.<br/>

[Link to preview project](https://ordamari.github.io/cars)
## Technologies
The project incorporates the following technologies:
 
* Angular
* Angular Materials 
* Docker
* Zod
* TypeScript
* ngrx
* ngx-charts
 
## Images
![image](https://github.com/ordamari/cars/assets/63239238/c127f8d5-bdff-44b6-97ca-72d54168fb11)
![image2](https://github.com/ordamari/cars/assets/63239238/fca56bdc-0637-4990-934f-89081da685b7)
![image3](https://github.com/ordamari/cars/assets/63239238/a6dc81d4-4b57-4d80-b991-6b4c40b47f3f)
![image4](https://github.com/ordamari/cars/assets/63239238/5d68b196-cb11-4625-b365-1178bc0e7290)

 
## Features
The Car match app offers the following features:
 
* Multi steps form- form that split to three steps, the user cant go to the next step without fill currectlly the current step.

* Chart: The app includes a chart to visualize satistics about the resaults of the forms.
 
* Favorites Management: Users can save their favorite cities and quickly access them on the favorites page. Each favorite location includes an ID, name. Clicking on a favorite location navigates to the main screen, showing detailed weather information for that location.

* Responsive Design: The app is designed to be responsive, ensuring an optimal user experience across various devices and screen sizes. It utilizes flexbox layouts to enhance visual appeal and maintain usability.
   
* Default Location: in the form have a part that the user need to feal his full address, have a button that using geolocation and API get location city and country and fill it in the form.
 
* Zod Validation: The app uses Zod, a powerful validation library, to validate data retrieved from the localstorage. This ensures that the data is properly structured and conforms to the expected format before being displayed to the user.
 
* Content Security Policy (CSP): The app implements a Content Security Policy to protect against cross-site scripting (XSS) attacks. By setting strict policies, the app reduces the risk of malicious scripts being injected into the application.
 
## Setup
 
### Docker compose for EZ setup
### App will be serve at http://localhost:3031 - you can change the port in the docker compose if you like 
 
```
version: '3.8'
 
services:
    web-app:
        image: 'ordamari/cars:latest'
        ports:
            - '3031:80'
```
 
### Local run
`pnpm i && pnpm start`
 
Note: npm should work the same.
