1. Server.js


- Connect each site

- Connect to port

- Intro


2. Index.ejs / index.js


- Authenticated: View poll & Create poll, unauthenticated: View poll & Sign up


3. login.ejs / login.js


- if req.param.user == database user && req.param.password, then login in

- else error


4. logout.js


- req.reset


5. signup.ejs / signup.js


- if req.param.username == database user => error

- else create user

6. createpoll.ejs / createpoll.js


- new mongodb schema (title, choices, votes, date)


7. mypolls.ejs / mypolls.js


- Delete poll

- Add new option


8. polls.ejs / polls.js


- Display all polls


9. eachpoll.ejs


- Chart.js with google colors array


10. vote.js


- if clicked, that option +1


11. navbar.ejs

- Authenticated: Create, view, my polls, logout, unauthenticated: View, login, sign up
