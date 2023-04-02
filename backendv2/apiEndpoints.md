### User endpoints

`/user/signUP`

-   Protected: No
-   Permissions: Anyone

`/user/login`

-   Protected: No
-   Permissions: Anyone

`/user/logout`

-   Protected: No
-   Permissions: Anyone

`/user/getLoggedInUser`

-   Protected: Yes
-   Permissions: Anyone

`/user/delete/:userID`

-   Protected: Yes
-   Permissions: Admin

`/user/getAllUsers`

-   Protected: Yes
-   Permissions: Admin

### Submission endpoints

`/submission/runCode`

-   Protected: Yes
-   Permissions: Student, Admin

`/submission/submitCode/:userID/:questionID`

-   Protected: Yes
-   Permissions: Student, Admin

`/submission/getSubmissions/:questionID`

-   Protected: Yes
-   Permissions: Student, Admin

`/submission/getOneSubmission/:userID/:questionID`

-   Protected: Yes
-   Permissions: Student, Admin

`/submission/deleteOneSubmission:/userID/:questionID`

-   Protected: Yes
-   Permissions: Student, Admin

### Question endpoints

`/question/getQuestion/:questionID`

-   Protected: Yes
-   Permissions: Student, Admin

`/question/allQuestions`

-   Protected: Yes
-   Permissions: Student, Admin

`/question/createQuestion`

-   Protected: Yes
-   Permissions: Admin

`/question/updateQuestion/:questionID`

-   Protected: Yes
-   Permissions: Admin

`/question/deleteQuestion/:questionID`

-   Protected: Yes
-   Permissions: Admin
