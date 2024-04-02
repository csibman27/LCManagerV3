# 👋 Welcome to the Final Project for HDIP22

# Introduction
## Name of project: LCManagerV3
## Student name: Tibor Molnar
## Student number: 20074237
## Project Website: https://csibman27.github.io/
 
# Abstract

LCManager is a web application designed specifically for system administrators to efficiently handle the management and execution of server and software lifecycles. By addressing usual challenges faced in on-premises server rooms, this application offers viable solution to enhance operational efficiency. One of the key advantages of LCManager is its ability to provide administrators with a centralized view of all servers’ lifecycle stages and ages. This feature offers invaluable visibility, ensuring that critical information is available and easily accessible. Moreover, LCManager introduces a catalog that enables administrators to identify crucial factors pertaining to server updates, disposals, and other necessary actions.

# Technical Report

+ Technical report available from the project website

## Child Repository: Initial work and tests with SvelteKit that relates to another repository
https://github.com/csibman27/LCManager

## Technolgies and modules used 🛠️

+ Node.js
+ hapi/hapi
+ axios
+ chai
+ mocha
+ tailwind
+ hapi/boom
+ hapi/cookie
+ autoprfixer
+ bcrypt
+ dotenv
+ handlebars
+ hapi-auth-jwt2
+ hapi-swagger
+ joi
+ jsonwebtoken
+ lowdb
+ nodemon
+ uuid

## Features 🤖

+ Password authentication
+ CRUD for all listing elements
+ Provision a server
+ Decommission a server
+ Provision services belong to a server
+ Review all servers using visualized pie charts
+ Track servers age
+ Track servers detailed information
+ Monitor support status of each server
+ Service dependency table
+ Dark mode theme support
+ Dark mode toogle button within application
+ Global system messages logged 

## Ux / DX Approach adopted
The general color scheme that I have implemented consists of light background colors complemented by shades of light blue, light orange, and gray. In addition, the application provides compatibility with a dark mode theme and includes a toggle button for users to switch between light and dark modes seamlessly within the interface.

In terms of user navigation, the journey begins at the welcome screen, with privileged users having the additional option to log in and access the dashboard. The navigation flow is intentionally kept simple and straightforward, with clear menu options guiding users through the application's functionalities.

To enhance data integrity and user experience, I have integrated validation checks using Joi for nearly all input forms within the application. This ensures that user inputs are validated before being processed, thereby reducing errors and enhancing overall data quality.


## Git Approach Adopted 

I have been utilizing Git right from the project's inception to save my work at regular intervals and to track the various versions throughout the development process. This approach has allowed me to maintain a well-structured development workflow.

To ensure a structured development process, I created a separate branch, distinct from the main branch. All development-related code was consistently pushed up to this feature branch and tagged at various significant milestones. Subsequently, the refined and finalized code was merged back into the main branch for seamless integration and deployment.


## UML Class Diagrams

> Login menu.
![][login]

> Navigation model screenshot.
![][nav_model]


> Provision server.
![][provision]

> List of Servers.
![][list_menu]



## References 📖

* Layouts
https://tailwindcss.com/docs/installation
* Node.js
https://nodejs.org/docs/latest/api/
* Hapi framework
https://hapi.dev/
* Handlebars
https://handlebarsjs.com/
* Bcrypt
https://codahale.com/how-to-safely-store-a-password/
* NodeJS MVC
https://www.sitepoint.com/node-js-mvc-application/


  

## Licensing

ISC License

Copyright 2024 Tibor Molnar

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


## Contact

* tibor.molnar@waltoninstitute.ie

[login]: ./public/misc/login.png
[nav_model]: ./public/misc/menu.png
[list_menu]: ./public/misc/list-servers.png
[provision]: ./public/misc/provision-server.png
