# Simple chat application.

Users enter the room and chat. The contact between the sockets and the receipt of the message is instant. Together with the database, I used the Map collection. I send the date to the server and save it in the map collection. Sockets are connected. And when the user is disconnected, everyone knows about it and the data is deleted in the database. At any time, someone who enters the room can see past messages. I used axios and hook reducer.

Еach room has its own id, its own message, and other users do not receive a message in another room.
For run Front-End (npm start).
For run Back-End (npm run dev).

## Home Chat Page

![Home Chat Page](https://i.imgur.com/NDCnmed.jpg)

## Room and new user, theme

![Room and new user, theme](https://i.imgur.com/CgybI7D.jpg)

## Messages

![Messages](https://i.imgur.com/zqBjqNq.jpg)

## Disconnect users

![Disconnect users](https://i.imgur.com/W6J4J4g.jpg)
