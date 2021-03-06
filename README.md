# Project tech website | Muzika
Muzika is a dating app for people who are music minded.
With this app you can meet other music lovers and go to a festival together.

![muzikaimg](https://user-images.githubusercontent.com/43336468/58909847-64198300-8714-11e9-83b1-e6f550b065ec.png)

## Overview
Basicly what it does ask for your preferences in terms of music and what kind of person you are looking for.
With this information the app will generate and recommand other users as possible matches.
In the end you decide wether you'll go looking for a relationship or just go have fun with people with the same taste in music/festivals.

## Getting started
### prerequisites
```
Git
Node
NPM
MongoDB
Any text/code editor
```
### Installation
```
1. Clone this repository
2. Head to your terminal/command prompt and navigate to the Muzika folder ( using cd ).
3. Use the "npm install" command to install the used packages.
4. Make a MongoDB collection called muzika
5. Use the "nodemon" command to startup the server.
6. Open your browser and navigate to localhost:5000.
```
### Used dependencies:
```
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "connect-flash": "*",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "express-messages": "*",
    "express-session": "^1.16.1",
    "express-validator": "*",
    "http-errors": "~1.6.3",
    "mongodb": "*",
    "mongoose": "*",
    "morgan": "~1.9.1",
    "multer": "*",
    "passport": "*",
    "passport-http": "*",
    "passport-local": "*",
    "pug": "^2.0.3"
```

## Database scheme
_id: ObjectId("23qre2fwedtg4we")

voornaam: "lars" string

email: "larsbreuren@gmail.com" string

gebruikersnaam: "Lars97" string

genre: "Hardstyle" string

leeftijd: "22" number

password: "$2a$10$XjtfojE5ATDCGuI8H1Gmy.kHQRcpEBhoZcFd.BjrEWDHDR5sOEMTi" string - hashed

profielfoto: "e332b7bc0c4e6e3765a8f6479a7637c5" string - multer

## Run examples and tests
When the installation is complete and you're at localhost:5000 you are allready able to sign up and login to your account.
If this doesn't give any problems you're good to go. 

## Design goals
Muzika is designed for music minded people and the mail goal is to connect people. The design goal is to make the app available for all who love music, easy design and relevant outcome.

## Detailed usage 
To start off, Muzika is build with Node.js & express. I've used PUG to generate the templates and bootstrap for a simple but responsive layout. For the login  i've used passport & bcrypt. For the register form multer and express-validator were used.
As for styling there are 2 .css files, one style.css and a bootstrap.css. 
The style.css is custom styling to maintain the Muzika branding, bootstrap is regular bootstrap style to handle the layout.

## Credits
Lars Breuren | CMD student HvA

Eduonix Learning Solutions | For using their User login system tutorial @ https://www.youtube.com/watch?v=hb26tQPmPl4.


