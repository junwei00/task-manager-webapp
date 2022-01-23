###### cvwo-todo-app

# Information

This is a submission for the NUS Computing for Voluntary Welfare Organisations (CVWO), AY21/22.

Name: Moo Jun Wei <br/>
Matriculation Number: A0239015L

A working demo of the application can be found at https://61ed325983f671927a0b43c7--lucid-wescoff-daa7eb.netlify.app/. <br/>
The user manual for this webapp can be found in this repository as User_Manual.pdf. <br />
Mid and Final submission writeups can be found in this repository as Mid_Submission.pdf and Final_Submission.pdf.

# Overview

This is a task management application capable of tagging, searching, sorting, and handling multiple user profiles. 
The Rails backend (todo-api) consists of 3 models - the User, Task, and Tag, and corresponding controllers for each. There is a one-to-many relationship from users to tasks and from users to tags, and there is a many-to-many relationship from tasks to tags.
The React frontend (todo-react) is a single page application that handles the sorting, searching, and dynamic updates to the list of tasks. 
