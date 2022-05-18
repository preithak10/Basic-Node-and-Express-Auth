## NodeJS + Express Server w/ MongoDB

Search endpoint: `/search`

Query param: `q="query topic"`

Host URL: `https://app-url/`

Demo Search URL: `https://app-url/search?q="Cell surface membrane"`

Returns a response of format `{"status":"Success","data":[array of question numbers]}`

Sample data present in *data* folder as *questions.json* and *topics.json*. *topics.js* contains the script to import to the database.
