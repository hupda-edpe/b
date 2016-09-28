# UBM - Unciron Bonita Middleware

### requirements
NodeJs v4.4.7+

access to a MongoDB 

### installation
clone from repository and run ```npm install ```

edit "config.js" according to your setup

run the app via ```npm start ```

###  configuration
config.js is the central config file
the following parameters are available:
- ```config.port ``` set the port the app should listen on
- ```config.dbURI ``` enter the address of the mongoDB  
- ```config.basicAuth ``` enable or disable basic authentication
- ```config.unicornExemption ``` enable or disable Unicorn 1.5 compatibility (basic auth REST notifications are not implemented in Unicorn
 1.5 and therefore if this option is set to ```true``` basic Authentication for POST requests will be disabled)
- ```config.sessionLength ``` set the time afte a session expires


all used packages are published under MIT licence
