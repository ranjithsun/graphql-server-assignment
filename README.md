# Assignment on Creating Graphql wrapper for SpaceX RestAPI

## Stack

The app is built on:
* GraphQL
* node.js
* express

## Instructions

Clone the repository and install packages:
*************
> git clone <-REMOTE GIT URL->

> cd <-cloned depository->

> npm install
*************

Run the App using Docker Compose up command
*******************
> docker-compose up
*******************

To Run in Browser
****************
> http://localhost:8080/graphql
****************

## Example Query and responses

**Query example** :

```
query{
  launchPadFailures(id:"5e9e4501f509094ba4566f84"){
    launchpad,
    all_failures{
      name,
      failures
    }
  }
}
```
**Query Responses** :

```
{
  "data": {
    "launchPadFailures": {
      "launchpad": "CCSFS SLC 40",
      "all_failures": [
        {
          "name": "CRS-7",
          "failures": "helium tank overpressure lead to the second stage LOX tank explosion"
        },
        {
          "name": "Amos-6",
          "failures": "buckled liner in several of the COPV tanks, causing perforations that allowed liquid and/or solid oxygen to accumulate underneath the lining, which was ignited by friction."
        }
      ]
    }
  }
}
```
