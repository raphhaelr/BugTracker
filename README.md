# BugTracker

Desenvolvido durante o curso FullStack Lab - @devpleno

How to use the project:

1- Create a Google Drive API Key and download the .json file with the API Key. So, change the require of variable 'const credentials' in the 'index.js' for your file .json

2- Create a Excel doc and put the doc ID in 'const docID' in the 'index.js'

3- Create a SendGrid API Key

4- Create a new file '.env' in the project folder 

5- Put the SendGrid API Key in a environment variable in the file .env 

6- Change 'const sendGridKey' with 'process.env.YOUR_NAME_FOR_ENVIRONMENT_VARIABLE'. 

7- For finish, put your email in variable 'const msg' in 'index.js' for send email when the kind of bug is CRITICAL.

