## NodeJS + Express Server w/ MongoDB

Search endpoint: `/search`

Query param: `q="query topic"`

Host URL: `https://pencil-be-assignment.herokuapp.com/`

Demo Search URL: `https://pencil-be-assignment.herokuapp.com/search?q="Cell surface membrane"`

Returns a response of format `{"status":"Success","data":[array of question numbers]}`

Sample data present in *data* folder as *questions.json* and *topics.json*. *topics.js* contains the script to import to the database.
