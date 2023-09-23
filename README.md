I - 1 Overview : 

In this subject you will need to build a website for the mighty pong contest. Your website will help user run pong tournament and play against each other. There will be an admin view, chat with moderators, real time multiplayer online games. There will be guilds and wars! You will need to follow thoses rules:
you must use the last stable version of every frameworks or libraries.
Your website backend should be written in NestJS.
You must use a postgresql database and no other databases.
The front end must be written with any typescript framework.
Your website should be a single page app, but user should be able to use the back button on the browser https://en.wikipedia.org/wiki/Singlepage_application
Your website must be usable on the latest version to date on Google Chrome, Firefox, Safari.
There must be no unhandled errors or warning when browsing through the website.
You can use any library.
Everything should run with a single call to docker-compose up –build

I - 2 Security concerns

Because you are creating a fully-working website, there are a few security concerns that you will have to tackle
Any password stored in your database must be encrypted
Your website must be protected against SQL injections
You must implement some kind of server-side validation for forms and any user input

I - 3 User Account

A user must login using the oauth system of 42 intranet
A user must be able to choose a unique name that will be displayed on the website
A user has a number of victory and loss and other stats (ladder level, number of won tournaments, achievements etc...)
A user must have an avatar generated or uploaded by the user
A user must be able to activate a 2 factor authentication (like google authenticator or a sms etc...)
A user can be in 1 guild at a time
A user can add other users as friends, and see their current status (online, offline, in a game...)
Each user has a match history (including duel, ladder or tournaments games) that can be consulted by anyone logged-in

I - 4 Chat

Users must be able to create channels public/private or protected by a password
Users must be able to send direct messages to other user
Users must be able to block other user and therefore they will not see their messages anymore
A user that create a new channel is automatically its owner until he leaves the channel - owner of a channel can add/change/remove a password to access to the channel - owner can select user to be administrator and is also administrator of the channel - administrator can ban or mute users for a certain amount of time
Through the chat interface users should be able to ask other player to do a Pong match
Through the chat interface users must be able to see other players profiles

I - 5 Game

The main purpose of this website is to play pong against other players and show everyone how good you are! Therefor we should be able to play pong directly on the website and live against an other player. It can be in a canvas or it can be with 3d effects, it can be ugly but it must be a pong like the one from 1972. If you want to, you can add power ups, different maps etc... but user must be able to play a default pong game without any added stuff. The game must be responsive! Other users can watch the game live without interfering in it.

Installation

set values in server/.env FORTYTWO_APP_ID FORTYTWO_APP_SECRET FORTYTWO_APP_CALLBACK_URL
set values in server/.env Google_APP_ID Google_APP_SECRET Google_APP_CALLBACK_URL
run commend line docker-compse up --build

![1691874485614](https://github.com/hboukiili/trancendese/assets/93588318/fed2231e-4e90-4bda-a9aa-18346cf6dc30)
![1691874485879](https://github.com/hboukiili/trancendese/assets/93588318/82c7ba5a-e6f1-4fa0-96f8-0358b17de7de)
![1691874485498](https://github.com/hboukiili/trancendese/assets/93588318/9eae8c35-348c-4ac5-9d98-dec432360ff9)
![1691874485503](https://github.com/hboukiili/trancendese/assets/93588318/cbbaab88-1a7e-4af4-84ff-c88aa034d4c9)
![Screenshot from 2023-09-23 15-50-14](https://github.com/hboukiili/trancendese/assets/93588318/cac02af1-8d89-4de3-bf50-02c7c993ea95)


