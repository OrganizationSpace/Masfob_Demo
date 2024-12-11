const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const axios = require('axios')
const morgan = require('morgan')
const cors = require('./function/cors')
const { redis } = require('./db/redis')
//const { channel, connection } = require('./db/rabbitmq')
const {conn} = require ('./db/mongodb')
const uploadfile = require('./function/s3/upload_file')
const getFileSize = require('./function/s3/get_file_size')
//const { conn } = require('./db/mongodb')

// const Data= require('./schema/data')
const errorHandler = require('./function/error_handler')
const connectRabbitMQ = require('./rabbitmq/rabbitmq')
const { setChannel, sendToQueue, ack, nack } = require('./rabbitmq/channel')

//dummy
const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
// app.use(express.json())
app.use(cors)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }))

dotenv.config()
// app.listen(1118, () => {
// 	console.log('SERVER STARTED 💐 ')
// })

connectRabbitMQ()
	.then((ch) => {
		setChannel(ch)
	})
	.catch((error) => {
		console.error('Error connecting to RabbitMQ', error)
	})


app.listen(3000, () => {
	console.log('SERVER STARTED 💐 ')

	mongoose
		.connect(
			'mongodb+srv://sona:sona2872@development.vhaae.mongodb.net/demo',
			{}
		)
		.then(() => {
			conn = mongoose.connection
			console.log('Connected to MongoDB')
		})
		.catch((error) => {
		//	console.log('Error connecting to MongoDB:', error)
		})
})
//////testing for landing
const Organization = require('./controller/organization')
const organizationP = new Organization()


const Customer = require('./controller/customer')
const customerP = new Customer()

const customerS = require('./schema/customer')
////////////
//router

const organization = require('./router/organization')
const agent = require('./router/agent')
const client = require('./router/client')
const asset = require('./router/asset')
const customer = require('./router/customer')
const mail = require('./router/mail')
const otp = require('./router/otp')
const environment = require('./router/environment')
const authorization = require('./function/auth')

//middleware
app.use('/organization', organization)
app.use('/agent', agent)
app.use('/client', client)
app.use('/asset', asset)
app.use('/customer', customer)
app.use('/mail', mail)
app.use('/otp', otp)
app.use('/environment', environment)

app.get('/', async (req, res) => {
	try {
		const response = { message: 'masfob server dev' }
		//console.log(response)
		res.status(200).json({ success: true, response })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
	}
})

app.post('/', async (req, res) => {
    try {
        const success = sendToQueue('account_center', 'PREFERENCE_INIT', {
            name: 'github',
        })
        if (success) {
            res.status(200).send(`Message sent to queue: `)
        } else {
            res.status(500).send('Failed to send message to queue')
        }
    } catch (error) {
        console.error('Failed to send message to queue', error)
        res.status(500).send('Failed to send message to queue')
    }
})


app.post('/zero', async (req, res) => {
	try {
		const body = req.body

console.log("payment",body);

		res.status(200).json({ body })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
	}
})
app.post('/one', async (req, res) => {
	try {
		const body = req.body

console.log("payment",body);

		res.status(200).json({ body })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
	}
})
app.post('/two', async (req, res) => {
	try {
		const body = req.body

console.log("payment",body);

		res.status(200).json({ body })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
	}
})

app.post('/land', async (req, res) => {
    try {
        console.log("************************ V I N O T H *****************************");
const body = req.body

console.log("payment",body);



// const check = await customerS.find({
//     workspace: "dev5779",
//     labels: { $exists: true, $ne: [] }
//   });
  
//   const labelList = check.map(doc => doc.labels);
  
//   console.log("Filtered Labels:", labelList);
//   const allLabels = labelList.flat();
//   console.log("All Labels:", allLabels);
    
  
//   console.log("check", check);

// const check = await customerS.find({
//     workspace: "dev5779",
//     labels: { $exists: true, $ne: [] }
//   });
//   console.log("check",check);
  
//   const list_label = await organization.listLabel({
//     workspace: 'dev5779',
// })

// const labelContacts = [];

// for (const label of list_label) {

//     const contacts = await customer.getContactsByLabel({
//         workspace: 'dev5779',
//         label: label,  // Pass the current label
//     });
 
//     labelContacts.push({
//         label: label,
//         contacts: contacts,  // Handle case where no contacts are found
//     });
// }

   
  
console.log("************************ V I N O T H *****************************");
        // const body = {
        //     id: 1381,
        //     parent_id: 0,
        //     status: "pending",
        //     currency: "INR",
        //     version: "9.3.3",
        //     prices_include_tax: false,
        //     date_created: "2024-10-14T05:13:31",
        //     date_modified: "2024-10-14T05:13:58",
        //     discount_total: "0.00",
        //     discount_tax: "0.00",
        //     shipping_total: "0.00",
        //     shipping_tax: "0.00",
        //     cart_tax: "0.18",
        //     total: "1.18",
        //     total_tax: "0.18",
        //     customer_id: 0,
        //     order_key: "wc_order_D8xzC3YeTP6c5",
        //     billing: {
        //         first_name: "hareesh",
        //         last_name: "",
        //         company: "mindvision",
        //         address_1: "anna nagar",
        //         address_2: "",
        //         city: "madurai",
        //         state: "",
        //         postcode: "",
        //         country: "IN",
        //         email: "kanieshjr@gmail.com",
        //         phone: "+918940105075"
        //     },
        //     shipping: {
        //         first_name: "",
        //         last_name: "",
        //         company: "",
        //         address_1: "",
        //         address_2: "",
        //         city: "",
        //         state: "",
        //         postcode: "",
        //         country: "",
        //         phone: ""
        //     },
        //     payment_method: "razorpay",
        //     payment_method_title: "Credit Card/Debit Card/NetBanking",
        //     transaction_id: "",
        //     customer_ip_address: "106.51.150.196",
        //     customer_user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
        //     created_via: "checkout",
        //     customer_note: "",
        //     date_completed: null,
        //     date_paid: null,
        //     cart_hash: "424cdece606ff7198f673f30d9b23127",
        //     number: "1381",
        //     meta_data: [
        //         { id: 620, key: "_awcfe_order_meta_key", value: {} },
        //         { id: 614, key: "_billing_bspan_stylecolorefe507delivery_addressspanb", value: "" },
        //         { id: 616, key: "_billing_pin", value: "625020" },
        //         { id: 615, key: "_billing_state_", value: "tamilnadu" },
        //         { id: 628, key: "_wc_order_attribution_device_type", value: "Desktop" },
        //         { id: 626, key: "_wc_order_attribution_session_count", value: "1" },
        //         { id: 623, key: "_wc_order_attribution_session_entry", value: "https://successlifemantra.com/c-ds-lp/" },
        //         { id: 625, key: "_wc_order_attribution_session_pages", value: "10" },
        //         { id: 624, key: "_wc_order_attribution_session_start_time", value: "2024-10-14 04:13:04" },
        //         { id: 621, key: "_wc_order_attribution_source_type", value: "typein" },
        //         { id: 627, key: "_wc_order_attribution_user_agent", value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36" },
        //         { id: 622, key: "_wc_order_attribution_utm_source", value: "(direct)" },
        //         { id: 629, key: "is_magic_checkout_order", value: "no" },
        //         { id: 617, key: "is_vat_exempt", value: "no" },
        //         { id: 630, key: "rzp_webhook_notified_at", value: "1728882838" }
        //     ],
        //     line_items: [
        //         {
        //             id: 70,
        //             name: "Google Reviews + Instagram + Youtube Cards",
        //             product_id: 1034,
        //             variation_id: 0,
        //             quantity: 1,
        //             tax_class: "",
        //             subtotal: "1.00",
        //             subtotal_tax: "0.18",
        //             total: "1.00",
        //             total_tax: "0.18",
        //             taxes: [],
        //             meta_data: [],
        //             sku: "",
        //             price: 1,
        //             image: {},
        //             parent_name: null
        //         }
        //     ],
        //     tax_lines: [
        //         {
        //             id: 71,
        //             rate_code: "IN-GST - 18%-1",
        //             rate_id: 2,
        //             label: "GST - 18%",
        //             compound: true,
        //             tax_total: "0.18",
        //             shipping_tax_total: "0.00",
        //             rate_percent: 18,
        //             meta_data: []
        //         }
        //     ],
        //     shipping_lines: [],
        //     fee_lines: [],
        //     coupon_lines: [],
        //     refunds: [],
        //     payment_url: "https://successlifemantra.com/checkout/order-pay/1381/?pay_for_order=true&key=wc_order_D8xzC3YeTP6c5",
        //     is_editable: true,
        //     needs_payment: true,
        //     needs_processing: true,
        //     date_created_gmt: "2024-10-14T05:13:31",
        //     date_modified_gmt: "2024-10-14T05:13:58",
        //     date_completed_gmt: null,
        //     date_paid_gmt: null,
        //     currency_symbol: "₹",
        //     _links: {
        //         self: [{}],
        //         collection: [{}]
        //     }
        // };
/////////////////// done lable assign message sending in whatsapp and mail aslo
        const extractedData = {
            name: body.billing?.first_name,
            company: body.billing?.company,
            address: body.billing?.address_1,
            email: body.billing?.email,
            phone_number: body.billing?.phone,
            gst: body.tax_lines?.length > 0 ? body.tax_lines[0]?.rate_percent : null,
            labels: body.line_items?.length > 0 ? body.line_items[0]?.name.split(" + ") : [] 
        };
        console.log("22222222222222222222222222222222222222222222222222222222222222222");
        console.log("extractedData", extractedData);
        console.log("22222222222222222222222222222222222222222222222222222222222222222");
        let countryCode = extractedData.phone_number.slice(1, 3); // "91"
        let phoneNumber = extractedData.phone_number.slice(3);
        
        
        console.log(`Country Code: ${countryCode}`);
        console.log(`Phone Number: ${phoneNumber}`);

        await organizationP.addLabel({
            workspace:"dev5779",
         
            customer_labels:extractedData.labels,
          });
         

        const customerData=await customerP.add({
            						workspace:"dev5779",
            						name:extractedData.name,
            						// display_name,
            						phone_number: phoneNumber || 'undefined',
            						 email: extractedData.email || 'undefined',
            						 country_code:countryCode,
            						// tags,
            						 labels:extractedData.labels,
            					  });
console.log(customerData);


        // Uncomment and modify as per your requirements
        sendToQueue('inderact', 'SERVICE_MESSAGE', {
            service: 'PAYMENT_MESSAGE',
            customer: extractedData,
        });

        sendToQueue('account_center', 'SERVICE_MAIL', {
			service: 'MAIL_PAYMENT',
			agent: extractedData,
		})

        // Respond with success
        res.status(200).json({
            success: true,
           data:extractedData,
         });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, error });
    }
});



// app.post('/land', async (req, res) => {
//     try {
//         // Define the body object directly as a JavaScript object
//         const body = {
//             id: 1381,
//             parent_id: 0,
//             status: "pending",
//             currency: "INR",
//             version: "9.3.3",
//             prices_include_tax: false,
//             date_created: "2024-10-14T05:13:31",
//             date_modified: "2024-10-14T05:13:58",
//             discount_total: "0.00",
//             discount_tax: "0.00",
//             shipping_total: "0.00",
//             shipping_tax: "0.00",
//             cart_tax: "0.18",
//             total: "1.18",
//             total_tax: "0.18",
//             customer_id: 0,
//             order_key: "wc_order_D8xzC3YeTP6c5",
//             billing: {
//                 first_name: "hareesh",
//                 last_name: "",
//                 company: "mindvision",
//                 address_1: "anna nagar",
//                 address_2: "",
//                 city: "madurai",
//                 state: "",
//                 postcode: "",
//                 country: "IN",
//                 email: "kanieshjr@gmail.com",
//                 phone: "+917540096599"
//             },
//             shipping: {
//                 first_name: "",
//                 last_name: "",
//                 company: "",
//                 address_1: "",
//                 address_2: "",
//                 city: "",
//                 state: "",
//                 postcode: "",
//                 country: "",
//                 phone: ""
//             },
//             payment_method: "razorpay",
//             payment_method_title: "Credit Card/Debit Card/NetBanking",
//             transaction_id: "",
//             customer_ip_address: "106.51.150.196",
//             customer_user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
//             created_via: "checkout",
//             customer_note: "",
//             date_completed: null,
//             date_paid: null,
//             cart_hash: "424cdece606ff7198f673f30d9b23127",
//             number: "1381",
//             meta_data: [
//                 { id: 620, key: "_awcfe_order_meta_key", value: {} },
//                 { id: 614, key: "_billing_bspan_stylecolorefe507delivery_addressspanb", value: "" },
//                 { id: 616, key: "_billing_pin", value: "625020" },
//                 { id: 615, key: "_billing_state_", value: "tamilnadu" },
//                 { id: 628, key: "_wc_order_attribution_device_type", value: "Desktop" },
//                 { id: 626, key: "_wc_order_attribution_session_count", value: "1" },
//                 { id: 623, key: "_wc_order_attribution_session_entry", value: "https://successlifemantra.com/c-ds-lp/" },
//                 { id: 625, key: "_wc_order_attribution_session_pages", value: "10" },
//                 { id: 624, key: "_wc_order_attribution_session_start_time", value: "2024-10-14 04:13:04" },
//                 { id: 621, key: "_wc_order_attribution_source_type", value: "typein" },
//                 { id: 627, key: "_wc_order_attribution_user_agent", value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36" },
//                 { id: 622, key: "_wc_order_attribution_utm_source", value: "(direct)" },
//                 { id: 629, key: "is_magic_checkout_order", value: "no" },
//                 { id: 617, key: "is_vat_exempt", value: "no" },
//                 { id: 630, key: "rzp_webhook_notified_at", value: "1728882838" }
//             ],
//             line_items: [
//                 {
//                     id: 70,
//                     name: "Google Reviews + Instagram + Youtube Cards",
//                     product_id: 1034,
//                     variation_id: 0,
//                     quantity: 1,
//                     tax_class: "",
//                     subtotal: "1.00",
//                     subtotal_tax: "0.18",
//                     total: "1.00",
//                     total_tax: "0.18",
//                     taxes: [],
//                     meta_data: [],
//                     sku: "",
//                     price: 1,
//                     image: {},
//                     parent_name: null
//                 }
//             ],
//             tax_lines: [
//                 {
//                     id: 71,
//                     rate_code: "IN-GST - 18%-1",
//                     rate_id: 2,
//                     label: "GST - 18%",
//                     compound: true,
//                     tax_total: "0.18",
//                     shipping_tax_total: "0.00",
//                     rate_percent: 18,
//                     meta_data: []
//                 }
//             ],
//             shipping_lines: [],
//             fee_lines: [],
//             coupon_lines: [],
//             refunds: [],
//             payment_url: "https://successlifemantra.com/checkout/order-pay/1381/?pay_for_order=true&key=wc_order_D8xzC3YeTP6c5",
//             is_editable: true,
//             needs_payment: true,
//             needs_processing: true,
//             date_created_gmt: "2024-10-14T05:13:31",
//             date_modified_gmt: "2024-10-14T05:13:58",
//             date_completed_gmt: null,
//             date_paid_gmt: null,
//             currency_symbol: "₹",
//             _links: {
//                 self: [{}],
//                 collection: [{}]
//             }
//         };

//         // Extract the required fields
       

//         console.log(extractedData); // For debugging
        
//         res.status(200).json({
//             success: true,
//             data: extractedData
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message, error });
//     }
// });



// app.post('/land', async (req, res) => {
// 	try {
// 		console.log("************************ V I N O T H *****************************");
		
// 					console.log(req.body);
// 					const phone_number=req.body
					
// 					console.log(phone_number);
// 					// await customerP.add({
// 					// 	workspace:"masfob",
// 					// 	// name,
// 					// 	// display_name,
// 					// 	phone_number: phone_number || 'undefined',
// 					// 	// email: email || 'undefined',
// 					// 	// country_code,
// 					// 	// tags,
// 					// 	// labels,
// 					//   });



// 					console.log("************************ V I N O T H *****************************");
// 					res.status(200).json({
// 						success: true,
// 					})
// 				} catch (error) {
// 					//console.error(error)
// 					res.status(500).json({ success: false, message: error.message, error })
// 				}
// 			})


// app.get('/indpage', async (req, res) => {
// 	try {
// 		//const result={"projects": [ {"id": 1, "data": {"assets": [], "styles": [], "pages": [{"component": "<div>Initial content</div>"}]} } ]}
// 		console.log(req.body)

// 		res.status(200).json({
// 			projects: [
// 				{
// 					id: 1,
// 					data: {
// 						assets: [],
// 						styles: [],
// 						pages: [{ component: '<div>Initial content</div>' }],
// 					},
// 				},
// 			],
// 		})
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ success: false, message: error.message, error })
// 	}
// })

// app.post('/indpage/post', async (req, res) => {
// 	try {
// 		//const result={"projects": [ {"id": 1, "data": {"assets": [], "styles": [], "pages": [{"component": "<div>Initial content</div>"}]} } ]}
// 		console.log(req.body)

// 		res.status(200).json({ success: true })
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ success: false, message: error.message, error })
// 	}
// })

// app.post(
// 	'/indpage/asset',

// 	uploadfile,
// 	async (req, res, next) => {
// 		try {
// 			const { filename } = req.body
// 			const { originalname } = req.file
// 			const extension = req.extension.slice(1)

// 			const file_size = await getFileSize(originalname)

// 			// const assetData = {
// 			// 	workspace: req.workspace,
// 			// 	name: filename ?? 'undefined',
// 			// 	url: process.env.SPACE_DOMAIN + originalname,
// 			// 	size: file_size,
// 			// 	format: extension,
// 			// 	tags: req.body.tags,
// 			// }

// 			const add_asset = await asset.add({
// 				workspace: req.workspace,
// 				name: filename ?? 'undefined',
// 				url: process.env.SPACE_DOMAIN + originalname,
// 				size: file_size,
// 				format: extension,
// 				tags: req.body.tags,
// 			})
// 			console.log('######')
// 			console.log(add_asset)
// 			console.log('######')

// 			res.status(200).json({
// 				success: true,
// 				message: 'Asset added successfully ',
// 				data: add_asset,
// 			})
// 		} catch (error) {
// 			// console.error(error)
// 			// res.status(500).json({ success: false, message: error.message, error })
// 			next(error)
// 		}
// 	}
// )

// app.get('/plan/list', authorization, async (req, res) => {
// 	const token = req.headers.authorization
// 	try {
// 		const result = await axios.post(
// 			'https://indcharge.api.mindvisiontechnologies.com/plan/list',
// 			{
// 				data: req.body,
// 			},
// 			{
// 				headers: {
// 					Authorization: token,
// 				},
// 			}
// 		)
// 		if (result.status == 200) {
// 			var data = result.data.data
// 			res.status(200).json({ success: true, data })
// 		} else {
// 			res.status(400).json({ success: false })
// 		}
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ success: false, message: error.message, error })
// 	}
// })
//test
// app.get('/plan/list',authorization,  async (req, res) => {
//   const token = req.headers.authorization;
//   try {
//    const result= await axios.post('https://indcharge.api.mindvisiontechnologies.com/integration/plan/list', {
// 			  data: req.body,
// 			},{
//         headers: {
//           Authorization:token
//           }
//       });
//       if(result.status==200){

//         var data= result.data.data
//         res.status(200).json({ success: true, data })

//       }
//       else{

//   res.status(400).json({ success: false })
//       }

// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ success: false, message: error.message, error })
// 	}
// })

//
// app.post('/paynow', authorization, async (req, res) => {
// 	// const response = await Data({
// 	// 	data: req,
// 	// }).save()
// 	const token = req.headers.authorization
// 	console.log('__________MASFOB______')
// 	console.log(req.body)
// 	console.log('**********************')

// 	try {
// 		const result = await axios.post(
// 			'https://indcharge.api.mindvisiontechnologies.com/generatepaymentLink',
// 			{
// 				data: req.body,
// 				workspace: req.workspace,
// 			},
// 			{
// 				headers: {
// 					Authorization: token,
// 				},
// 			}
// 		)
// 		console.log('@@@@@@@@@@@@@@@2')
// 		console.log(req.workspace)
// 		console.log('@@@@@@@@@@@@@@@@')
// 		var data = result.data.data
// 		var workspaces = req.workspace
// 		res.status(200).json({ success: true, data: data, workspaces })
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ success: false, message: error.message, error })
// 	}
// })

// app.post('/pay', async (req, res) => {
// 	console.log(req.data)

// 	try {
// 		res.status(200).json(req.data)
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ success: false, message: error.message, error })
// 	}
// })
////
// app.post('/coupon/redeem', authorization, async (req, res) => {
// 	const token = req.headers.authorization
// 	try {
// 		const result = await axios.post(
// 			'https://indcharge.api.mindvisiontechnologies.com/coupon/redeem',
// 			{
// 				data: req.body,
// 			},
// 			{
// 				headers: {
// 					Authorization: token,
// 				},
// 			}
// 		)
// 		if (result.status == 200) {
// 			var data = result.data
// 			res.status(200).json({ success: true, data })
// 		} else {
// 			return res.status(result.status).json({ success: false })
// 		}
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ success: false, message: error.message, error })
// 	}
// })

// app.post('/coupon/redeem',  authorization,async (req, res) => {
//   const token = req.headers.authorization;
//   try {
//    const result= await axios.post('https://indcharge.api.mindvisiontechnologies.com/coupon/redeem', {
// 			  data: req.body
// 			},{headers: {
//         Authorization:token
//         }});
//       if(result.status==200){

//         var data= result.data
//         res.status(200).json({ success: true, data })
//
//       }
//       else{

//   res.status(400).json({ success: false })
//       }

// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ success: false, message: error.message, error })
// 	}
// })

// app.post('/promo/redeem', authorization, async (req, res) => {
// 	const token = req.headers.authorization

// 	try {
// 		const result = await axios.post(
// 			'https://indcharge.api.mindvisiontechnologies.com/promo/redeem',
// 			{
// 				data: req.body,
// 			},
// 			{
// 				headers: {
// 					Authorization: token,
// 				},
// 			}
// 		)
// 		console.log(result)
// 		if (result.status == 200) {
// 			var data = result.data
// 			res.status(200).json({ success: true, data })
// 		} else {
// 			console.log('RIGERD')

// 			res.status(400).json({ success: false })
// 		}
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ success: false, message: error.message, error })
// 	}
// })
// app.get('/subscription/list', authorization, async (req, res) => {
// 	const token = req.headers.authorization
// 	try {
// 		const result = await axios.post(
// 			'https://indcharge.api.mindvisiontechnologies.com/subscription/list',
// 			{ workspace: req.workspace },
// 			{ headers: { Authorization: token } }
// 		)

// 		res.status(200).json(result.data)
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ success: false, message: error.message, error })
// 	}
// })

// app.get('/transaction/list', authorization, async (req, res) => {
// 	const token = req.headers.authorization
// 	try {
// 		const result = await axios.post(
// 			'https://indcharge.api.mindvisiontechnologies.com/transaction/list',
// 			{ workspace: req.workspace },
// 			{ headers: { Authorization: token } }
// 		)

// 		res.status(200).json(result.data)
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ success: false, message: error.message, error })
// 	}
// })

// app.get('/error', async (req, res, next) => {
// 	try {
// 		console.log(name) // This will throw a ReferenceError
// 		res.json({ name: name })
// 	} catch (error) {
// 		next(error)
// 	}
// })

// app.post(
// 	'/generatepaymentLink',
// 	// authorization,
// 	generatePaymentLink,
// 	async (req, res) => {
// 		//console.log(req.link);
// 		try {
// 			const link = req.link
// 			res.status(200).json({
// 				success: true,
// 				message: 'Successfully generated payment link',
// 				data: link,
// 			})
// 		} catch (error) {
// 			console.error(error)
// 			res.status(500).json({
// 				success: false,
// 				message: 'An error occurred',
// 				error: error.message,
// 			})
// 		}
// 	}
// ) link is generated  in this in need  expried the link

app.use(errorHandler)
