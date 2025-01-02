const axios = require('axios')
const { redis } = require('../db/redis')
const { sendToQueue } = require('../rabbitmq/channel')
const Customer_ = require('../schema/customer')
const Workflow_ = require('../schema/workflow')
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
				'https://indcharge.api.mindvisiontechnologies.com/subscription/check',
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

	async meta({ data }) {
		try {
			
			const result = await axios.post(
				`https://graph.facebook.com/v21.0/566917379828344/messages`,

				
				data,
				{
					headers: { 
						Authorization:`Bearer EACCqGGtJE2oBO80um0mGsRZC47uGedK6s4Rl2WKSOrtPCQ9ZA0fZAv81u1RKig743SDTmZAgDYKyQktQlWzggMssf6WamIzEXCTUp2WkFPNXSIlGVsuAZC9AdqbWbr79UH5gdouLWt93BZCYudQ07vkwAfYqxFXCW4ORMo4DldkjufJjH58WZATQiUbBpUUpZAyRWAREZA4QxTvywBMI1oivC7t1MLNBjvwz1VScZD`,
							'Content-Type': 'application/json',
					},
				}
			)

			return result
		} catch (error) {
			//console.error(error)
			throw error
		}
	}

	async meta1({ param }) {
		try {
			const phone_number = param.phn_number;
			console.log(phone_number);
			const check = await Workflow_.findOne({ id: "flow-221" });
			console.log('check',check);
			const link = check.answer.link;
			const text= check.answer.text;
			const labelOne = check.answer.button[0].label;
			console.log('labelOne',labelOne);
			const labelTwo = check.answer.button[1].label;
			console.log('labelTwo',labelTwo);
			const data = {
				"messaging_product": "whatsapp",
	"recipient_type": "individual",
	"to": phone_number, 
	"type": "interactive",
	"interactive": {
	  "type": "button",
	  "header": {
		"type": "image",
		"image": {
		  "link": link,
		}
	  },
	  "body": {
		"text": text,
	  },
	  
	  "action": {
		"buttons": [
		  {
			"type": "reply",
			"reply": {
			  "id": "change-button",
			  "title": labelOne,
			}
		  },
		  {
			"type": "reply",
			"reply": {
			  "id": "cancel-button",
			  "title": labelTwo,
			}
		  }
		]
	  }
	}
  };	
			  console.log('result1',data);
			  
			  const result = await axios.post(
                'https://graph.facebook.com/v21.0/566917379828344/messages',
                
                data,
                {
                    headers: {
                        'Authorization': `Bearer EACCqGGtJE2oBOxAc8EiU8DkXhUQBQQKS0otKLc4E0XED1xk3s1kgxkCO9oe2mXASQbxD6ji9GuhB3sk28jNssKrNpkilXpUDdhsh9J2vvZCbJiZBB1jXQ04NOhLC9LVRKRWlmHt1fXwExk87NZCCW2yyixYYdJllYNqRz7x5xa3QERs73CO8VXvVHSSZCUZB8FdPwZAJUe9xmgssqgbDHcbzPP6po4nzrzIjrl`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            console.log(result);
            

			return result
		} catch (error) {
			//console.error(error)
			throw error
		}
	}
	
	async testmeta({ data }) {
		try {
			
			const result = await axios.post(
				`https://graph.facebook.com/v21.0/454207377775000/messages `,

				
				data,
				{
					headers: { 
						Authorization:`Bearer EAARqh52SDGgBO9w1nP2qFX7pFqWqjZArzbnRZCUtPfRX3V9QiPdAxcqv1zFOZAzJATQrwG2AELBOJ4FLc3hVHJcH98fM12iiD3vF3giIX8ao6dS2T9ndxcZCfoTTccIQQcka2j3c6ssrjpjyV2npZA3R5s40qA0eoHqxUZAZCptZAkJlHM9mZAG0wMGntpKnlPfxacZBGcfTfVN2lFVFyIFVZAJ2Rz9nLP234ms3ADO`,
						'Content-Type': 'application/json',
					},
				}
			)

			return result
		} catch (error) {
			//console.error(error)
			throw error
		}
	}

	async urlmeta({ data }) {
		try {
			
			const result = await axios.post(
				`https://graph.facebook.com/v21.0/454207377775000/messages `,

				
				data,
				{
					headers: { 
						Authorization:`Bearer EAARqh52SDGgBO2afHp66mOG3jI04Mmf0uooPc3ZCF1vTAPTIXLswP3WmJsRBg6aKWd2MHS3ZAo0KuZBwEZAHfT1w5SDwrgJhBgMZBnfmEBcG0wG1i436XvgHH609cHe3qZChh6PGZCCB4bOwYaPlzBNk8DdRpEXYVNo0Nh7CRI1SxZCaDiZBpZA1qiUxya3izzO18pfle2fXPRGutuxfiafchXcZAGkAHvHnf6ZC9cUZD`,
						'Content-Type': 'application/json',
					},
				}
			)

			return result
		} catch (error) {
			//console.error(error)
			throw error
		}
	}

	async buttonmeta({ data }) {
		try {
			
			const result = await axios.post(
				`https://graph.facebook.com/v21.0/454207377775000/messages `,

				
				data,
				{
					headers: { 
						'Authorization':`Bearer EAARqh52SDGgBO2afHp66mOG3jI04Mmf0uooPc3ZCF1vTAPTIXLswP3WmJsRBg6aKWd2MHS3ZAo0KuZBwEZAHfT1w5SDwrgJhBgMZBnfmEBcG0wG1i436XvgHH609cHe3qZChh6PGZCCB4bOwYaPlzBNk8DdRpEXYVNo0Nh7CRI1SxZCaDiZBpZA1qiUxya3izzO18pfle2fXPRGutuxfiafchXcZAGkAHvHnf6ZC9cUZD`,
						'Content-Type': 'application/json',
					},
				}
			)

			return result
		} catch (error) {
			//console.error(error)
			throw error
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

	async testingMeta({ data }) {
        try {
            
            
            const result = await axios.post(
                'https://graph.facebook.com/v21.0/566917379828344/messages',
                
                data,
                {
                    headers: {
                        'Authorization': `Bearer EACCqGGtJE2oBOxAc8EiU8DkXhUQBQQKS0otKLc4E0XED1xk3s1kgxkCO9oe2mXASQbxD6ji9GuhB3sk28jNssKrNpkilXpUDdhsh9J2vvZCbJiZBB1jXQ04NOhLC9LVRKRWlmHt1fXwExk87NZCCW2yyixYYdJllYNqRz7x5xa3QERs73CO8VXvVHSSZCUZB8FdPwZAJUe9xmgssqgbDHcbzPP6po4nzrzIjrl`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            console.log(result);
            
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
