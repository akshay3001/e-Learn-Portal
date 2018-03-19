README.md file--

Prerequisites:

1. Download Nodejs from here-- https://nodejs.org/en/download/
2. Install Nodejs-- http://blog.teamtreehouse.com/install-node-js-npm-windows


Setting up project for the first time--

1. Download entire project from here-- https://github.com/akshay3001/e-Learn-Portal
2. After downloading extract zip anywhere.
3. Open the extracted zip and run cmd there.(on the extracted folder location).
4. Run--a) npm install
        b) npm install -g nodemon
    Close the cmd that you've used to install packages.
5. Open new cmd at the same folder location and run-- nodemon app.js
    After hitting 'nodemon app.js' it will give some message saying-'Server is running on port 3001'
    When you see the message you are good to go.


6. Open browser- localhost:3001
    You'll see the dashboard and done.


Things we have implemented in the project--

Technology Stack-

We have created e-Learning Portal as a SPA(Single page application) using MEAN Stack.

MEAN
M- MongoDb-- Database.
E- Express-- host Node.js projects.
A- Angularjs -- FrontEnd.
N- Nodejs-- Server side.

1. I have created 2 logins-
    i) Student- username- akshay
                password- akshay
    ii) Instructor - username- avinash
                     password- avinash

    Currently two logins are active, you can add more logins by going into 'create new account' section.

    *Earlier we also had a admin login, but due to time constraint I have disabled that user right.

2. Things on dashboard and most places are static, eg: links, they dont point to anywhere.

3. Instructor can upload a course by loggin in and creating new course.

4. We had also implemented i18(internationalization 18 languages), in this project we had only focused on two languages ie: English and Marathi.
    i18 is implemented using angularjs and locale by using local JSON, so that anyone can add new languages.
    When language is switched the page doesnt refresh as we have implemented i18 by angular.

5. We also had implemented chat functionality so that any user can have chat with admin and asks his/her queries about the courses or any other.
    for activating chat-
    Open new tab on browser.
    Hit- localhost:3001/chatlogin
    it will ask for username, password
    username-- admin
    password-- admin123

    and thats it you can see number of users connected and you can chat with anyone of them by clicking on the name form the list.

6. For file uploads we have used multer- it doesnt matters on UI side but on backend we have used multer.

7. *We had also implemented paypal payment gateway but this is now disbaled.


*Now the course you have added, cannot be subscribed by student, this is an open issue now.





