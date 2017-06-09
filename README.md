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

### Testing
* Create a Mongo DB database
* Create a collection named `geo`
* Seed it with `lat` and `lng` documents i.e.
	```
	{
	    lat: -7.324983924832,
	    lng: 34.02343289420
	}
	...
	```
* You can use the test data file in `src/data.js`
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
        status: 'success'
    }
    ```
* Error Response

	Code:
    
    `405`
    
    Content:
    ```
    { error: 'method GET to /api/v1/geofence is not allowed.' }
    ```
    or
    ```
    { error: 'method PUT to /api/v1/geofence is not allowed.' }
    ```
    or
    ```
    { error: 'method DELETE to /api/v1/geofence is not allowed.' }
    ```
    or
    ```
    { error: 'method PATCH to /api/v1/geofence is not allowed.' }
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
#### 1.1 Geofilter
##### 1.1.1 Rectangle
Returns coordinates within a rectangle of the specified dimensions.

* URL

	`/api/v1/geofilter/rectangle`
* METHOD

	`POST`
* URL Params

	None
* Data Params

	Required:
    
     ```
     length=[integer or float]
     width=[integer or float]
     coordinate=[object]
     ```
* Success Response

	Code:
    
    `200`
    
    Content:
    
    ```
    {
    	url: '/api/v1/geofilter/rectangle',
        coordinates: [{lat: -7.128378213, lng: 34.281378213},{lat: -7.23413413, lng: 34.124124124}],
        status: 'success'
    }
    ```
* Error Response

	Code:
    
    `405`
    
    Content:
    ```
    { error: 'method GET to /api/v1/geofilter/rectangle is not allowed.' }
    ```
    or
    ```
    { error: 'method PUT to /api/v1/geofilter/rectangle is not allowed.' }
    ```
    or
    ```
    { error: 'method DELETE to /api/v1/geofilter/rectangle is not allowed.' }
    ```
    or
    ```
    { error: 'method PATCH to /api/v1/geofilter/rectangle is not allowed.' }
    ```
    
    Code:
    
    `400`
    
     Content:
    ```
    { error: 'length is needed!' }
    ```
    or
    ```
    { error: 'length should be a number! 5o is not a number' }
    ```
    or
    ```
    { error: 'width is needed!' }
    ```
    or
    ```
    { error: 'width should be a number! 5o is not a number' }
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
        url: "/api/v1/geofilter/rectangle",
        {
            width: 50.01,
            length: 23.123,
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

##### 1.1.2 Polygon
Returns coordinates that fall within the polygon.

* URL

	`/api/v1/geofilter/polygon`
* METHOD

	`POST`
* URL Params

	None
* Data Params

	Required:
    
     ```
     polygon=[array of objects]
     ```
* Success Response

	Code:
    
    `200`
    
    Content:
    
    ```
    {
    	url: '/api/v1/geofilter/polygon',
        coordinates: [{lat: -7.128378213, lng: 34.281378213},{lat: -7.23413413, lng: 34.124124124}],
        status: 'success'
    }
    ```
* Error Response

	Code:
    
    `405`
    
    Content:
    ```
    { error: 'method GET to /api/v1/geofilter/polygon is not allowed.' }
    ```
    or
    ```
    { error: 'method PUT to /api/v1/geofilter/polygon is not allowed.' }
    ```
    or
    ```
    { error: 'method DELETE to /api/v1/geofilter/polygon is not allowed.' }
    ```
    or
    ```
    { error: 'method PATCH to /api/v1/geofilter/polygon is not allowed.' }
    ```
    
    Code:
    
    `400`
    
     Content:
    ```
    { error: 'polygon is needed!' }
    ```
    or
    ```
    { error: 'polygon should have atleast 3 sides! Only 2 given' }
    ```
    or
    ```
    { error: 'polygon should be a key: value object! 24.9502033542525 is not a key: value object' }
    ```
     or
    ```
    { error: 'values of coordinate should be numbers. lng: -81.1248784353252o is not a number.' }
    ```
    
* Sample call

	```
     $.ajax({
        url: "/api/v1/geofilter/polygon",
        {
            "polygon": [{
                    "latitude": -1.2860228894319572,
                    "longitude": 36.821813328539356
                },
                {
                    "latitude": -1.2866669573753995,
                    "longitude": 36.82181332862068
                },
                {
                    "latitude": -1.2866669573753995,
                    "longitude": 36.82116909824216
                },
                {
                    "latitude": -1.2860228894319572,
                    "longitude": 36.82116909832338
                }
            ]
        },
        dataType: "json",
        type : "POST",
        success : function(data, status) {
          console.log(data);
        }
      });
    ```
