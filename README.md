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
> View the documentation of this project on the [project wiki](https://github.com/musale/demo-cordinates-api/wiki/Demo-Coordinates-API-Documentation)
