
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const axios=require('axios')
const morgan = require('morgan')
const cors = require('./function/cors')

// const Data= require('./schema/data')

//dummy
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'))
app.use(express.json())
app.use(cors)
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config()
app.listen(3000, () => {
    console.log('SERVER STARTED 💐 ');
  
    mongoose
      .connect('mongodb+srv://sona:sona2872@development.vhaae.mongodb.net/demo', {
      })
      .then(() => {
        conn = mongoose.connection;
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
      });
  });

  //router

  const organization = require ('./router/organization')
  const agent = require ('./router/agent')
  const asset = require ('./router/asset')
  const customer = require ('./router/customer')
  const email = require ('./router/email');
const authorization = require('./function/auth');

  //middleware
 app.use('/organization',organization)
 app.use('/agent',agent)
 app.use('/asset',asset)
 app.use('/customer',customer)
 app.use('/email',email)

 app.get('/', async (req, res) => {
	try {
		const response = { message: 'masfob server' }
		//console.log(response)
		res.status(200).json({ success: true, response })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
	}
})  

//test
app.get('/plan/list',  async (req, res) => {
	try {
   const result= await axios.post('https://indcharge.api.mindvisiontechnologies.com/integration/plan/list', {
			  data: req.body,
			});
      if(result.status==200){
      
        var data= result.data.data
        res.status(200).json({ success: true, data })
    

      }
      else{

  res.status(400).json({ success: false })
      }
     



		
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
	}
})  

//
app.post('/paynow',  async (req, res) => {
	// const response = await Data({
	// 	data: req,
	// }).save()
	console.log("__________MASFOB______");
  console.log(req.body);
  console.log("**********************");

  try {
   const result= await axios.post('https://indcharge.api.mindvisiontechnologies.com/generatepaymentLink', {
			  data: req.body,
			});

      var data= result.data.data
    	res.status(200).json({success:true,data})
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
	}
}) 

app.post('/pay',  async (req, res) => {

  console.log(req.data);
  

  try {

    	res.status(200).json(req.data)
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
	}
}) 

app.post('/coupon/redeem',  async (req, res) => {
	try {
   const result= await axios.post('https://indcharge.api.mindvisiontechnologies.com/coupon/redeem', {
			  data: req.body,
			});
      if(result.status==200){
      
        var data= result.data
        res.status(200).json({ success: true, data })
    

      }
      else{

  res.status(400).json({ success: false })
      }
     



		
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
	}
})  
app.post('/promo/redeem',  async (req, res) => {
	try {
   const result= await axios.post('https://indcharge.api.mindvisiontechnologies.com/promo/redeem', {
			  data: req.body,
			});
      if(result.status==200){
      
        var data= result.data
        res.status(200).json({ success: true, data })
    

      }
      else{console.log("RIGERD");

  res.status(400).json({ success: false })
      }
     



		
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
	}
})  
app.get('/subscription/list', async (req, res) => {
  try {
    const result = await axios.post('https://indcharge.api.mindvisiontechnologies.com/subscription/list');

   

    res.status(200).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message, error });
  }
});
     
app.get('/transaction/list', async (req, res) => {
  try {
    const result = await axios.post('https://indcharge.api.mindvisiontechnologies.com/transaction/list');

   

    res.status(200).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message, error });
  }
});







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
