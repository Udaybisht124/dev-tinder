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
-POST /request/review/:status/:requestId


 
 ## userRouter
 -GET : /user/connections
 -GET : /user/requests
 -GET /user/feed --gets you the profiles of a other user


 status: ignore,accepted,rejected,interested



./feed/page=1&limit=10
1-10
./feed/page=2&limit=10
11-20
./feed/page=3&limit=10
21-30
./feed/page=4&limit=10
31-40

skip = (page-1)*10  

