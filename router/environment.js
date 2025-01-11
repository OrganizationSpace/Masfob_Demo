const express = require('express')
const moment = require('moment');
const router = express.Router()

const Environment = require('../controller/environment')
const authorization = require('../function/auth')
const uploadfile = require("../function/s3/upload_file");
const { sign, attestation } =require('../function/signature')
const axios = require('axios')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')

const environment = new Environment()

router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/plan/list', authorization, async (req, res,next) => {
	const token = req.headers.authorization
	const data = req.body
	try {
		const list_plans = await environment.listPlans({ token, data })
		// const result = await axios.post(
		// 	'https://indcharge.api.mindvisiontechnologies.com/plan/list',
		// 	{
		// 		data: req.body,
		// 	},
		// 	{
		// 		headers: {
		// 			Authorization: token,
		// 		},
		// 	}
		// )
		if (list_plans.status == 200) {
			res.status(200).json({ success: true, data: list_plans.data.data })
		} else {
			res.status(400).json({ success: false })
		}
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})
  
router.get('/plan/list', authorization, async (req, res,next) => {
	const token = req.headers.authorization
	const data = req.body
	try {
		const list_plans = await environment.listPlans({ token, data })
		// const result = await axios.post(
		// 	'https://indcharge.api.mindvisiontechnologies.com/plan/list',
		// 	{
		// 		data: req.body,
		// 	},
		// 	{
		// 		headers: {
		// 			Authorization: token,
		// 		},
		// 	}
		// )
		if (list_plans.status == 200) {
			res.status(200).json({ success: true, data: list_plans.data.data })
		} else {
			res.status(400).json({ success: false })
		}
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

router.get('/product/list', authorization, async (req, res,next) => {
		const token = req.headers.authorization
		//const workspace = req.workspace
		try {
			const list_subscriptions = await environment.listProduct({
				token,
				//workspace,
			})
	
			// const result = await axios.post(
			// 	'https://indcharge.api.mindvisiontechnologies.com/subscription/list',
			// 	{ workspace: req.workspace },
			// 	{ headers: { Authorization: token } }
			// )
	
			res.status(200).json(list_subscriptions.data)
		} catch (error) {
			console.error(error)
			//res.status(500).json({ success: false, message: error.message, error })
			next(error)
		}
	})

router.get('/advertisement/list', authorization, async (req, res,next) => {
		const token = req.headers.authorization
		//const workspace = req.workspace
		try {
			const list_subscriptions = await environment.listAdvertisement({
				token,
				//workspace,
			})
	
			// const result = await axios.post(
			// 	'https://indcharge.api.mindvisiontechnologies.com/subscription/list',
			// 	{ workspace: req.workspace },
			// 	{ headers: { Authorization: token } }
			// )
	
			res.status(200).json(list_subscriptions.data)
		} catch (error) {
			console.error(error)
			//res.status(500).json({ success: false, message: error.message, error })
			next(error)
		}
	})

router.post('/product/fetch', authorization, async (req, res,next) => {
		const token = req.headers.authorization;
	
		try {
			const product_code = req.body.product_code; // Corrected to access product_code
			const fetch_products = await environment.fetchProduct({
				token,
				product_code
			});
	
	// 		if (fetch_products.status === 200) {
	// 			res.status(200).json(fetch_products.data);
	// 		} else {
	// 			res.status(400).json({ success: false });
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 		res.status(500).json({ success: false, message: error.message, error });
	// 	}
	// });
	res
	.status(200)
	.json({ success: true, data:fetch_products.data })
} catch (error) {
console.error(error)
//res.status(500).json({ success: false, message: error.message, error })
next(error)
}
})
	
router.post('/paynow', authorization, async (req, res,next) => {
	const token = req.headers.authorization
	const data = req.body
	const workspace = req.workspace
	try {
		const payment_link = await environment.generatePaymentLink({
			token,
			data,
			workspace,
		})
		// const result = await axios.post(
		// 	'https://indcharge.api.mindvisiontechnologies.com/generatepaymentLink',
		// 	{
		// 		data: req.body,
		// 		workspace: req.workspace,
		// 	},
		// 	{
		// 		headers: {
		// 			Authorization: token,
		// 		},
		// 	}
		// )
		// var data = payment_link.data.data
		// var workspaces = req.workspace
		res
			.status(200)
			.json({ success: true, data: payment_link.data.data, workspace })
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

router.post('/coupon/redeem', authorization, async (req, res,next) => {
	const token = req.headers.authorization;
	const data = req.body;
  
	try {
	  const redeemCouponResponse = await environment.redeemCoupon({ token, data });
  
	  if (redeemCouponResponse.status === 200) {
		res.status(200).json({ success: true, message: redeemCouponResponse.data, data: redeemCouponResponse.data });
	  } else {
		res.status(400).json({ success: false, message: redeemCouponResponse.data });
	  }
  
	} catch (error) {
	  console.error(error);
	//  res.status(500).json({ success: false, message: error.message, error });
	  next(error)
	}
  });

router.post('/promo/redeem', authorization, async (req, res,next) => {
	const token = req.headers.authorization
	const data = req.body
	try {
		const redeem_promo = await environment.redeemPromo({ token, data })

		// const result = await axios.post(
		// 	'https://indcharge.api.mindvisiontechnologies.com/promo/redeem',
		// 	{
		// 		data: req.body,
		// 	},
		// 	{
		// 		headers: {
		// 			Authorization: token,
		// 		},
		// 	}
		// )
		if (redeem_promo.status == 200) {
			//var data = redeem_promo.data
			res.status(200).json({ success: true, data: redeem_promo.data })
		} else {

			res.status(400).json({ success: false })
		}
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

router.get('/subscription/list', authorization, async (req, res,next) => {
	const token = req.headers.authorization
	const workspace = req.workspace
	try {
		const list_subscriptions = await environment.listSubscriptions({
			token,
			workspace,
		})

		// const result = await axios.post(
		// 	'https://indcharge.api.mindvisiontechnologies.com/subscription/list',
		// 	{ workspace: req.workspace },
		// 	{ headers: { Authorization: token } }
		// )

		res.status(200).json(list_subscriptions.data)
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

//test
router.get('/transaction/list', authorization, async (req, res,next) => {
	const token = req.headers.authorization
	const workspace = req.workspace
	try {
		const page = req.body.page ?? 0; 
        const query = req.body.query ?? null;

		const list_transactions = await environment.listTransactions({
			token,
			workspace,
			page,
			query
		})

		// const result = await axios.post(
		// 	'https://indcharge.api.mindvisiontechnologies.com/transaction/list',
		// 	{ workspace:workspace },
		// 	{ headers: { Authorization: token } }
		// )

		res.status(200).json(list_transactions.data)
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

// test for landing page 

router.get('/trans/list', authorization, async (req, res, next) => {
	const token = req.headers.authorization;
	const workspace = req.workspace;
	
	try {
	  const page = req.body.page ?? 0;
	  const query = req.body.query ?? null;
  
	  const list_transactions = await environment.listTransactions({
		token,
		workspace,
		page,
		query
	  });
  
	  const data = list_transactions.data;
  
	  // Log the data to verify its structure
	  console.log('list_transactions.data:', data);
  
	  
	  const currentDate = moment().toISOString();
  
	  console.log('Current Date:', currentDate);
  
	  const filteredTransactions = data.filter((transaction) => {
		// Check if the transaction status is 'paid'
		if (transaction.status === 'paid') {
		  const transactionDate = new Date(transaction.timestamp);
  
		  // Compare transaction date and current date
		  if (
			transactionDate.getUTCFullYear() === new Date(currentDate).getUTCFullYear() &&
			transactionDate.getUTCMonth() === new Date(currentDate).getUTCMonth() &&
			transactionDate.getUTCDate() === new Date(currentDate).getUTCDate() &&
			transactionDate.getUTCHours() === new Date(currentDate).getUTCHours() &&
			transactionDate.getUTCMinutes() === new Date(currentDate).getUTCMinutes()
		  ) {
			console.log(`Transaction ${transaction._id} is paid and timestamp matches the current date and time`);
			return true; // Keep the transaction
		  } else {
			console.log(`Transaction ${transaction._id} date and time do not match current date and time`);
			return false; // Ignore this transaction
		  }
		} else {
		  console.log(`Transaction ${transaction._id} status is not "paid"`);
		  return false; // Ignore this transaction
		}
	  });
  
	  // Return filtered transactions
	  res.status(200).json({
		success: true,
		transactions: filteredTransactions
	  });
	} catch (error) {
	  console.error(error);
	  next(error); // Pass error to the error handler
	}
  });

router.post('/coupon/unhold', authorization, async (req, res,next) => {
	const token = req.headers.authorization
	const data = req.body
	try {
		const unhold_coupon = await environment.unHold({ token, data })

		if (unhold_coupon.status == 200) {
			//var data = redeem_coupon.data
			res.status(200).json({ success: true })
		} else {
			return res.status(unhold_coupon.status).json({ success: false })
		}
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

router.get('/integration/list', authorization, async (req, res,next) => {
	const token = req.headers.authorization
	// const workspace =req.workspace
	try {
		const integration_list = await environment.listIntegration({ token })
		res.status(200).json(integration_list.data)
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

router.post('/integration/list/:need',attestation, authorization, async (req, res,next) => {
	const token = req.headers.authorization
	const need = req.params.need
	// const workspace =req.workspace
	try {
		const integrationneed_list = await environment.listIntegrationNeed({
			token,
			need,
		})

		res.status(200).json(integrationneed_list.data)
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

router.post('/integration/active/list', authorization, async (req, res,next) => {
	// const token = req.headers.authorization
	// const need = req.params.need
	// const workspace =req.workspace
	try {
		const active_integrations = await environment.listActiveIntegration({
			workspace: req.workspace,
		})

		res.status(200).json({ data: active_integrations })
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

router.post('/integration/activation', authorization, async (req, res,next) => {
	 const token = req.headers.authorization
	// const need = req.params.need
	// const workspace =req.workspace
	try {
		const { activation, code } = req.body
        const eligible_integartion = await environment.eligible({token,code})
		if(eligible_integartion){
			var result
	
	
			if (activation) {
				result = await environment.activateIntegration({
					workspace: req.workspace,
					integration_code: code,
				})
			} else {
				result = await environment.deactivateIntegration({
					workspace: req.workspace,
					integration_code: code,
				})
			}
			res.status(200).json({ success:'true',message:'integartion list successfully',data: {} })
		} else{
			res.status(400).json({ success:'false',message:'you cannot buy the products',data: {} })
		}
		
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

//tst
router.post('/free/get', authorization, async (req, res,next) => {
	const token = req.headers.authorization
	try {
		const plan_code = req.body.plan_code
		const list_products = await environment.freeProducts({
			token,
			plan_code,
		})
	
		res.status(200).json(list_products.data)
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

router.post('/product/logo/update', authorization,uploadfile, async (req, res,next) => {
	const token = req.headers.authorization
	try {
		const product_code = req.body.product_code
		const update_logo = await environment.logoUpdaterProduct({
			token,
			product_code,
			image: process.env.SPACE_DOMAIN + req.file.originalname ?? "undefined",
		})
	
		res.status(200).json(update_logo.data)
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

router.post('/product/update', authorization, async (req, res,next) => {
	const token = req.headers.authorization
	try {
		const {product_code,url,description,name} = req.body
		const update_products = await environment.updateProduct({
			token,
			product_code,
			name,url,description
		})
	
		res.status(200).json(update_products.data)
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

router.post('/', authorization, async (req, res,next) => {
	const token = req.headers.authorization
	try {
		const plan_code = req.body.plan_code
		const list_products = await environment.freeProducts({
			token,
			plan_code,
		})
	
		res.status(200).json(list_products.data)
	} catch (error) {
		console.error(error)
		//res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

//backend route use in inderact 
router.post('/optinout', attestation, async (req, res,next) => {
	try {
		const workspace = req.body.workspace
		const fullPhoneNumber = req.body.phone_number;
        const phone_number = fullPhoneNumber.slice(-10);
		const opt = req.body.opt

		const result = await environment.optInOut({ workspace, phone_number, opt })

		
		res.status(200).json({
			success: true,
			message: 'successfully updated',
			data: result,
		})	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

module.exports = router
