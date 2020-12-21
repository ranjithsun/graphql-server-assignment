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

cd <-cloned depository->

> npm install
*************

Run the App using Docker Compose up command
*******************
> docker-compose up
*******************

To Run in Browser
****************
http://localhost:8080/graphql
****************

## Example Query and responses

**Query example** :

```
query{
  allLaunchPads{
    id,
    launchpad
  }
}
```
**Query Responses** :

```
{
  "data": {
    "allLaunchPads": [
      {
        "id": "5e9e4501f5090910d4566f83",
        "launchpad": "VAFB SLC 3W"
      },
      {
        "id": "5e9e4501f509094ba4566f84",
        "launchpad": "CCSFS SLC 40"
      },
      {
        "id": "5e9e4502f5090927f8566f85",
        "launchpad": "STLS"
      },
      {
        "id": "5e9e4502f5090995de566f86",
        "launchpad": "Kwajalein Atoll"
      },
      {
        "id": "5e9e4502f509092b78566f87",
        "launchpad": "VAFB SLC 4E"
      },
      {
        "id": "5e9e4502f509094188566f88",
        "launchpad": "KSC LC 39A"
      }
    ]
  }
}
```