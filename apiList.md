##authentication router

- POST: /login
- POST: /signup
- POST :/logout


##profile router

--GET :/profile/view
-PATCH:/profile/edit
-path :/profile/password


### connectionRequestRouter
-POST /request/send/interested/:userid
-POST :/request/send/ignored/:userid
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestedId
 
 ## userRouter
 -GET : /user/connections
 -GET : /user/requests
 -GET /user/feed --gets you the profiles of a other user


 status: ignore,accepted,rejected,interested