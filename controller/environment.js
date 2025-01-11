const axios = require('axios')
const { redis } = require('../db/redis')
const { sendToQueue } = require('../rabbitmq/channel')
const Customer_ = require('../schema/customer')

const { sign, attestation } = require('../function/signature')
class Environment {
	async initPreference({ workspace }) {
		try {
			// const data = {
			// 	action: 'PREFERENCE_INIT',
			// 	data: {
			// 		workspace: workspace,
			// 	},
			// }

			// const payload = JSON.stringify(data)
			// const signature = sign(payload)

			//array reserved for integration in redis
			const integartion = await redis.sadd(`integration:${workspace}`, 'INIT')

			sendToQueue('indspot', 'PREFERENCE_INIT', { workspace: workspace })
			// const indspot = await axios.post(
			// 	'https://indspot.api.mindvisiontechnologies.com/agent/preference/init',
			// 	data,
			// 	{
			// 		headers: {
			// 			'x-webhook-signature': signature,
			// 		},
			// 	}
			// )

			sendToQueue('indesk', 'PREFERENCE_INIT', { workspace: workspace })

			// const indesk = await axios.post(
			// 	'https://indesk.api.mindvisiontechnologies.com/preference/init',
			// 	data,
			// 	{
			// 		headers: {
			// 			'x-webhook-signature': signature,
			// 		},
			// 	}
			// )

			sendToQueue('indophy', 'PREFERENCE_INIT', { workspace: workspace })
			// const indophy = await axios.post(
			// 	'https://indophy.api.mindvisiontechnologies.com/user/preference/init',
			// 	data,
			// 	{
			// 		headers: {
			// 			'x-webhook-signature': signature,
			// 		},
			// 	}
			// )

			sendToQueue('indmail', 'PREFERENCE_INIT', { workspace: workspace })
			// const indmail = await axios.post(
			// 	'https://indmail.api.mindvisiontechnologies.com/preference/init',
			// 	data,
			// 	{
			// 		headers: {
			// 			'x-webhook-signature': signature,
			// 		},
			// 	}
			// )
			sendToQueue('inderact', 'PREFERENCE_INIT', { workspace: workspace })
			// const inderact = await axios.post(
			// 	'https://inderact.api.mindvisiontechnologies.com/preference/init',
			// 	data,
			// 	{
			// 		headers: {
			// 			'x-webhook-signature': signature,
			// 		},
			// 	}
			// )
			//	console.log('preference __ i n t __ inderact ', inderact)
			// console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
			// console.log(inderact.data)

			sendToQueue('indig', 'PREFERENCE_INIT', { workspace: workspace })
			// const indig = await axios.post(
			// 	'https://indig.api.mindvisiontechnologies.com/user/preference/init',
			// 	data,
			// 	{
			// 		headers: {
			// 			'x-webhook-signature': signature,
			// 		},
			// 	}
			// )
			// console.log("preference __ i n t __indig",indig);
			// console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
			// console.log(indig.data);

			sendToQueue('indpage', 'PREFERENCE_INIT', { workspace: workspace })
			// const indpage = await axios.post(
			// 	'https://indpage.api.mindvisiontechnologies.com/preference/init',
			// 	data,
			// 	{
			// 		headers: {
			// 			'x-webhook-signature': signature,
			// 		},
			// 	}
			// )

			//return [indspot, indesk, indophy, indmail, inderact, indig, indpage]
			return
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async checkSubscription({ code, workspace }) {
		try {
			const data = {
				code: code,
				workspace: workspace,
			}
			const payload = JSON.stringify(data)
			const signature = sign(payload)
			//	const signature = sign()
			const result = await axios.post(
				'http://localhost:4000/subscription/check',
				//'https://indcharge.api.mindvisiontechnologies.com/subscription/check',
				//'http://192.168.29.233:1117/subscription/check',
				data,
				{
					headers: {
						'x-webhook-signature': signature,
					},
				}
			)

			return result
		} catch (error) {
			//console.error(error)
			throw error
		}
	}

	async generatePaymentLink({ token, data, workspace }) {
		try {
			const inputData = {
				data: data,
				workspace: workspace,
			}

			const payload = JSON.stringify(inputData)
			const signature = sign(payload)
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/razorpay/generatepaymentlink',
				{
					data: data,
					workspace: workspace,
				},
				{
					headers: {
						Authorization: token,
						'x-webhook-signature': signature,
					},
				}
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}
	async redeemCoupon({ token, data }) {
		try {
			const inputData = {
				data: data,
			}

			const payload = JSON.stringify(inputData)
			const signature = sign(payload)
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/coupon/redeem',
				{
					data: data,
				},
				{
					headers: {
						Authorization: token,
						'x-webhook-signature': signature,
					},
				}
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async redeemPromo({ token, data }) {
		try {
			const inputData = {
				data: data,
			}

			const payload = JSON.stringify(inputData)
			const signature = sign(payload)
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/promo/redeem',
				{
					data: data,
				},
				{
					headers: {
						Authorization: token,
						'x-webhook-signature': signature,
					},
				}
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async listSubscriptions({ token, workspace }) {
		try {
			const inputData = {
				workspace: workspace,
			}

			const payload = JSON.stringify(inputData)
			const signature = sign(payload)
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/subscription/list',
				{ workspace: workspace },
				{
					headers: {
						Authorization: token,
						'x-webhook-signature': signature,
					},
				}
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async listProduct({ token }) {
		try {
			// const inputData = {
			// 	workspace: workspace,
			// }

			// const payload = JSON.stringify(inputData)
			// const signature = sign(payload)
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/product/list/v2',
				{},
				{
					headers: {
					Authorization: token,
					// 	'x-webhook-signature': signature,
					 },
				}
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async listAdvertisement({ token }) {
		try {
			// const inputData = {
			// 	workspace: workspace,
			// }

			// const payload = JSON.stringify(inputData)
			// const signature = sign(payload)
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/advertisement/list',
				{ },
				{
					headers: {
						Authorization: token,
						//'x-webhook-signature': signature,
					},
				}
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async fetchProduct({ token, product_code }) {
		try {
			const data = {
				product_code: product_code,
			};
	
			const payload = JSON.stringify(data);
			const signature = sign(payload);
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/product/fetch/v2',
				{ data: data },
				{
					headers: {
						Authorization: token,
						'x-webhook-signature': signature,
					},
				}
			);
	
			return result.data; // Ensure to return the response data directly
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	
	async listPlans({ token, data }) {
	  try {
		const inputData = {
		  data: data,
		}
	
		const payload = JSON.stringify(inputData)
		const signature = sign(payload)
		const result = await axios.post(
		  'https://indcharge.api.mindvisiontechnologies.com/plan/list',
		  {
			data: data,
		  },
		  {
			headers: {
			  Authorization: token,
			  'x-webhook-signature': signature,
			},
		  }
		)
		return result
	  } catch (error) {
		console.error(error)
		throw error
	  }
	}
	
	async listTransactions({ token, workspace,page,query }) {
		try {
			const inputData = {
				workspace: workspace,
				page:page,
				query:query
			}

			const payload = JSON.stringify(inputData)
			const signature = sign(payload)
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/transaction/list',
				{ workspace: workspace },
				{
					headers: {
						Authorization: token,
						'x-webhook-signature': signature,
					},
				}
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async unHold({ token, data }) {
		try {
			const inputData = {
				data: data,
			}

			const payload = JSON.stringify(inputData)
			const signature = sign(payload)
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/coupon/unhold',
				{
					data: data,
				},
				{
					headers: {
						Authorization: token,
						'x-webhook-signature': signature,
					},
				}
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async listIntegration({ token }) {
		try {
			const inputData = {}

			const payload = JSON.stringify(inputData)
			const signature = sign(payload)
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/integration/list',
				{
					//data: req.body,
				},
				{
					headers: {
						Authorization: token,
						'x-webhook-signature': signature,
					},
				}
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async listIntegrationNeed({ token, need }) {
		try {
			const inputData = {}

			const payload = JSON.stringify(inputData)
			const signature = sign(payload)
			const result = await axios.post(
				`https://indcharge.api.mindvisiontechnologies.com/integration/list/${need}`,
				{
					// need:need
				},
				{
					headers: {
						Authorization: token,
						'x-webhook-signature': signature,
					},
				}
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async listActiveIntegration({ workspace }) {
		const result = await redis.smembers(`integration:${workspace}`)
		return result
	}

	async activateIntegration({ workspace, integration_code }) {
		try {
			const result = await redis.sadd(
				`integration:${workspace}`,
				integration_code
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async deactivateIntegration({ workspace, integration_code }) {
		try {
			const result = await redis.srem(
				`integration:${workspace}`,
				integration_code
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async isActiveIntegration({ workspace, integration_code }) {
		const result = await redis.sismember(
			`integration:${workspace}`,
			integration_code
		)
		return result
	}

	async eligible({ token, code }) {
		try {
			const inputData = {
				code: code,
			}

			const payload = JSON.stringify(inputData)
			const signature = sign(payload)
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/integration/eligible',
				inputData,
				{
					headers: {
						Authorization: token,
						'x-webhook-signature': signature,
					},
				}
			)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async freeProducts({ token, plan_code }) {
		try {
			const data = {
				plan_code: plan_code,
			}
			const payload = JSON.stringify(data)
			const signature = sign(payload)
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/subscription/free/get',
				data,
				{
					headers: {
						Authorization: token,
						'x-webhook-signature': signature,
					},
				}
			)

			return result
		} catch (error) {
			//console.error(error)
			throw error
		}
	}

	async logoUpdaterProduct({ token, product_code,image }) {
		try {
			const data = {
				product_code: product_code,
				image
			}
			const payload = JSON.stringify(data)
			const signature = sign(payload)
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/product/logo/update',
				data,
				{
					headers: {
						Authorization: token,
						'x-webhook-signature': signature,
					},
				}
			)

			return result
		} catch (error) {
			//console.error(error)
			throw error
		}
	}

	async updateProduct({ token, product_code,description,name,url }) {
		try {
			const data = {
				product_code: product_code,
				description:description,url:url,name:name

			}
			const payload = JSON.stringify(data)
			const signature = sign(payload)
			const result = await axios.post(
				'https://indcharge.api.mindvisiontechnologies.com/product/update',
				data,
				{
					headers: {
						Authorization: token,
						'x-webhook-signature': signature,
					},
				}
			)

			return result
		} catch (error) {
			//console.error(error)
			throw error
		}
	}

	//use inderact function contact optinout
	async optInOut({ workspace, phone_number, opt }) {
		try {
			const result = await Customer_.updateOne(
				{
					workspace: workspace,
					phone_number: phone_number,
				},
				{
					$set: {
						opt_out: opt,
					},
				}
			)

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

}
module.exports = Environment
