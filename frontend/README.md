# Client-Side Code


## Login Feature
The login page is the root of the application. On a successful login, the user will be redirected to the dashboard. On a failed login, an error message will be displayed.

The user will be redirected to a sign up page if the `Create an Account` button is clicked

### Requirements and Data Validation
* Email field must not be empty
* Email must be of sfu domain i.e. `@sfu.ca`
* Password field must not be empty
* Email and password must map to a user already in the database <mark>TO DO</mark>


## Sign up Feature
The sign up page is for students that have not yet created an account. Students can navigate to this page from the login page.

On a successful sign up, the user will be redirected to the dashboard and their information will be saved. On a failed sign up, an error message will be displayed.

### Requirements and Data Validation
* Email field must not be empty
* Email must be of sfu domain i.e. `@sfu.ca`
* Password field must not be empty
* Confirmation Password field must not be empty
* Password and Confirmation Password must match exactly
* Email and password must not map to a user already in the database <mark>TO DO</mark>