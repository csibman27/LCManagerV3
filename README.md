# 👋 Welcome to Final Project of HDIP22

# Name of project: LCManagerV3
 
# Abstract

LCManager is a web application designed specifically for system administrators to efficiently handle the management and execution of server and software lifecycles. By addressing usual challenges faced in on-premises server rooms, this application offers viable solution to enhance operational efficiency. One of the key advantages of LCManager is its ability to provide administrators with a centralized view of all servers’ lifecycle stages and ages. This feature offers invaluable visibility, ensuring that critical information is available and easily accessible. Moreover, LCManager introduces a catalog that enables administrators to identify crucial factors pertaining to server updates, disposals, and other necessary actions.

# Technical Report

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
+ Review all servers using visualized pie charts

## Ux / DX Approach adopted
The general color scheme that I have implemented consists of light background colors complemented by shades of light blue, light orange, and gray. In addition, the application has been designed to support a dark mode option for users.

In terms of user navigation, the journey begins at the welcome screen, with privileged users having the additional option to log in and access the dashboard. The navigation flow is intentionally kept simple and straightforward, with clear menu options guiding users through the application's functionalities.

To enhance data integrity and user experience, I have integrated validation checks using Joi for nearly all input forms within the application. This ensures that user inputs are validated before being processed, thereby reducing errors and enhancing overall data quality.

Furthermore, in terms of the application's architecture, I have opted to rework the outdated Model-View-Controller (MVC) structure to create a more modern and scalable design that aligns with current best practices in software development.


## Google Api

I have already registered an APi key with google so I only had to go through the setting of adding another type of sign in mechanism through firebase consol.

## Git Approach Adopted 

I have been utilizing Git right from the project's inception to save my work at regular intervals and to track the various versions throughout the development process. This approach has allowed me to maintain a well-structured development workflow.

To ensure a structured development process, I created a separate branch, distinct from the main branch. All development-related code was consistently pushed up to this feature branch and tagged at various significant milestones. Subsequently, the refined and finalized code was merged back into the main branch for seamless integration and deployment.


## UML Class Diagrams

> Navigation model screenshot.
![][nav_model]


> Class sketch image.
![][model_classes]


> Login Menu.
![][login]


> List of Servers.
![][list_menu]


> Horizontal menu.
![][drawer]



## References 📖

* Layouts
https://tailwindcss.com/docs/installation



## About

## Privacy Policy

## Licensing

ISC License

Copyright 2024 Tibor Molnar

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


## Contact

* tibor.molnar@waltoninstitute.ie

[nav_model]: ./images/nav_model.jpg
[model_classes]: ./images/model_classes.jpg
[login]: ./images/login.jpg
[list_menu]: ./images/list_menu.jpg
[drawer]: ./images/drawer.jpg
