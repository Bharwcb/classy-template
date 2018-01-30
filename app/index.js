require('dotenv').config();
const rp = require("request-promise");
const _ = require('lodash');

let auth_options = {
	method: 'POST',
	uri: "https://api.classy.org/oauth2/auth",
	body: {
		"grant_type": "client_credentials",
		"client_id": process.env.CLASSY_KEY,
		"client_secret": process.env.CLASSY_SECRET
	},
	json: true
}

let access_token;
function request_access_token() {
	rp(auth_options)
	.then((res) => {
		access_token = res.access_token;

		// any API requests
		fetch_campaign_transactions();
	})
	.catch((err) => {
		console.log("Error requesting access token: ", err);
	})
}

function fetch_campaign_transactions() {

	console.log("access token: ", access_token);
}

request_access_token();






// let total_transactions = [];

// let params = {
//   filter: "purchased_at>2017-10-01T00:00:01-05:00,purchased_at<2017-10-31T23:59:59-05:00,status=success&sort=created_at:desc&per_page=100"
// }

// let options = {
//   uri: "https://api.classy.org/2.0/campaigns/" + process.env.CAMPAIGN_ID + "transactions",
//   // json: true,
//   headers: {
//   	"Authorization": "Bearar " + process.env.ACCESS_TOKEN,
//   },
//   qs: params
// }

// // classy_request(options);

// function classy_request(options) {
// 	params.page = params.page || 1;
// 	console.log("page: ", params.page);
// 	rp(options)
// 	.then((res) => {
// 		// iterate through each transaction and push to total_transactions

// 		// collect responses from page 2 - last page
// 	})
// 	.catch((err) => {
// 		console.log("Error: ", err);
// 	})
// }


// function livechat_request(options) {
//   params.page = params.page || 1;
//   console.log("page: ", params.page);
//   rp(options)
//   .auth(process.env.EMAIL, process.env.API_KEY)
//   .then((res) => {
//     // push to total_chats only columns that we need 
//     res.chats.forEach((chat) => {
//       let filtered_chat = _.pick(chat, model);
//       total_chats.push(filtered_chat);
//     })
//     // collect responses from page 2 - last page 
//     if (params.page < res.pages) {
//       params = _.merge(params, {"page":(params.page + 1)});
//       setTimeout(next_request, 1500);
//       function next_request() {
//         return livechat_request(options);
//       }
//     } else {
//       console.log("total_chats length: ", total_chats.length);
//       console.log("```````````");
//       // print to convert to CSV
//       console.log(JSON.stringify(total_chats));
//       return total_chats;
//     }
//   })
//   .catch((err) => {
//     console.log("Error: ", err)
//   })
// };


