[![CircleCI](https://circleci.com/gh/musale/demo-cordinates-api.svg?style=svg)](https://circleci.com/gh/musale/demo-cordinates-api)
# Demo Coordinates API

Node JS and MongoDB app that geo-fences and geo-filters

### Requirements
* Node JS
* Mongo DB

### Getting Started
* Clone this repo
* `cd demo-cordinates-api`
* Run `npm install`
* Create a `development` and `testing` local Mongo DB databases
* `cp .env_sample .env`
* Fill out the `.env` file with your Mongo DB URIs
* Run `npm run dev` to start a development server on port 5000
* Run `npm test` to perform the tests

### Documentation
#### 1. API Version
Shows the current API version.

* URL

	`/api/v1`
* METHOD

	`GET`
* URL Params

	None
* Data Params

	None
* Success Response

	Code:
    
    `200`
    
    Content:
    
    ```
    {version: 1.0.0}
    ```
* Error Response

	Code:
    
    `405`
    
    Content:
    ```
    { error: 'method POST to /api/v1 is not allowed.' }
    ```
* Sample call

	```
     $.ajax({
        url: "/api/v1",
        dataType: "json",
        type : "GET",
        success : function(r) {
          console.log(r);
        }
      });
    ```
#### 1.1 Geofence
Returns coordinates within a radius (in meters) of an arbitrary location.

* URL

	`/api/v1/geofence`
* METHOD

	`POST`
* URL Params

	None
* Data Params

	Required:
    
     ```
     radius=[integer or float]
     coordinate=[object]
     ```
* Success Response

	Code:
    
    `200`
    
    Content:
    
    ```
    {
    	url: '/api/v1/geofence',
        coordinates: [{lat: -7.128378213, lng: 34.281378213},{lat: -7.23413413, lng: 34.124124124}],
        radius: 90.09
    }
    ```
* Error Response

	Code:
    
    `405`
    
    Content:
    ```
    { error: 'method GET to /api/v1 is not allowed.' }
    ```
    or
    ```
    { error: 'method PUT to /api/v1 is not allowed.' }
    ```
    or
    ```
    { error: 'method DELETE to /api/v1 is not allowed.' }
    ```
    or
    ```
    { error: 'method PATCH to /api/v1 is not allowed.' }
    ```
    
    Code:
    
    `400`
    
     Content:
    ```
    { error: 'radius is needed!' }
    ```
    or
    ```
    { error: 'radius should be a number! 5o is not a number' }
    ```
    or
    ```
    { error: 'coordinate is needed!' }
    ```
    or
    ```
    { error: 'coordinate should be a key: value object! 24.9502033542525,-81.1248784353252 is not a key: value object' }
    ```
     or
    ```
    { error: 'values of coordinate should be numbers. lng: -81.1248784353252o is not a number.' }
    ```
    
* Sample call

	```
     $.ajax({
        url: "/api/v1/geofence",
        {
            radius: 50.01,
            coordinate: {
                lat: -1.286344923424,
                lng: 36.8214912134314
            }
        },
        dataType: "json",
        type : "POST",
        success : function(data, status) {
          console.log(data);
        }
      });
    ```
