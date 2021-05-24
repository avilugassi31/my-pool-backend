import axios from "axios";

const options = {
  method: 'POST',
  url: 'https://maytapi-whatsapp.p.rapidapi.com/%7Bphone_id%7D/delete',
  headers: {
    'x-rapidapi-key': '0a310a40a2mshf8171641be666e5p1e7b6cjsn656a7d78171d',
    'x-rapidapi-host': 'maytapi-whatsapp.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});