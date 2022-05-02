# task-manager-webapp

## Information

The user manual for this webapp can be found in this repository as User_Manual.pdf. <br />

## Overview

This is a task management application capable of tagging, searching, sorting, and handling multiple user profiles. <br/>
The Rails backend (todo-api) consists of 3 models - the User, Task, and Tag, and corresponding controllers for each. There is a one-to-many relationship from users to tasks and from users to tags, and there is a many-to-many relationship from tasks to tags. <br/>
The React frontend (todo-react) is a single page application that handles the sorting, searching, and dynamic updates to the list of tasks. 

## Screenshots

![Screenshot 1](/images/screenshot_1.PNG) <br/>
![Screenshot 2](/images/screenshot_2.PNG) <br/>
![Screenshot 3](/images/screenshot_3.PNG) <br/>

## Running the Development Server

The development server was tested on Ubuntu 20.04 LTS. <br/>
Start the Rails api server: `cd todo-api && rails s` <br/>
Start the React app: `cd todo-react && yarn start` <br/>
