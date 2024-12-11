require('dotenv').config()
const { setChannel, sendToQueue, ack, nack } = require('../rabbitmq/channel')
const Mail = require('../controller/mail')

const { welcomeMessage,updatePassword,addAgent,deleteAgent,updateRole,transaction,lableAssign } = require('../function/mail_content')

const { Transaction } = require('mongodb')
const mail = new Mail()
async function mailServices(data) {
	try {
		switch (data.service) {
			case 'MAIL_PAYMENT':
				var agent = data.agent
				var content = lableAssign({
					recipientName: agent.name,
					workspace: agent.workspace,
					username: agent.email,
				})
				var mailOptions = {
					from: process.env.SERVICE_MAIL,
					to: agent.email,
					subject: 'WELCOME',
					html: content,
				}
				await mail.send(mailOptions)

				return true


			case 'ORGANIZATION_CREATE':
				var agent = data.agent
				var content = welcomeMessage({
					recipientName: agent.name,
					workspace: agent.workspace,
					username: agent.email,
				})
				var mailOptions = {
					from: process.env.SERVICE_MAIL,
					to: agent.email,
					subject: 'WELCOME',
					html: content,
				}
				await mail.send(mailOptions)

				return true
				
				
			case 'PASSWORD_UPDATE':
				var agent = data.agent
				var content = updatePassword({
					recipientName: agent.name,
					workspace: agent.workspace,
					username: agent.email,
					password:agent.password
				})
				var mailOptions = {
					from: process.env.SERVICE_MAIL,
					to: agent.email,
					subject: 'WELCOME',
					html: content,
				}
				await mail.send(mailOptions)

				return true

		
		
				case 'AGENT_ADDED':
					var agent = data.agent
				var content = addAgent({
					recipientName: agent.name,
					workspace: agent.workspace,
					username: agent.email,
				})
				var mailOptions = {
					from: process.env.SERVICE_MAIL,
					to: agent.email,
					subject: 'WELCOME',
					html: content,
				}
				await mail.send(mailOptions)

				return true
				
				case 'ROLE_UPDATE':
				var agent = data.agent
				var content = updateRole({
					recipientName: agent.name,
					workspace: agent.workspace,
					username: agent.email,
					password:agent.password
				})
				var mailOptions = {
					from: process.env.SERVICE_MAIL,
					to: agent.email,
					subject: 'Update on Your Role and Responsibilities',
					html: content,
				}
				await mail.send(mailOptions)

				return true

			
				case 'AGENT_DELETE':
					var agent = data.agent
				var content = deleteAgent({
					 recipientName: agent.name,
					workspace: agent.workspace,
					username: agent.email,
				})
				var mailOptions = {
					from: process.env.SERVICE_MAIL,
					to: agent.email,
					subject: 'WELCOME',
					html: content,
				}
				await mail.send(mailOptions)

				return true
				// case '':
				// 	var agent = data.agent
				// 	console.log("_______agent____SUBSCRIPTION_CREATE",agent);
				// var content = subscription({
				// 	 recipientName: agent.customer_email,
				// 	workspace: agent.customer_workspace,
				// 	username: agent.customer_email,
				// 	plan_code:agent.plan_code,
                //     plan_name:agent.plan_name
					
				// })
				// var mailOptions = {
				// 	from: 'izaz.m@mindvisiontechnologies.com',
				// 	to: agent.customer_email,
				// 	subject: 'WELCOME',
				// 	html: content,
				// }
				// await mail.send(mailOptions)

				// return true
				case 'TRANSACTION_CREATE':
					var agent = data.agent
					//console.log("_______agent____TRANSACTION_CREATE",agent);
				var content = transaction({
					 recipientName: agent.email,
					workspace: agent.customer_workspace,
					username: agent.email,
					plan_code:agent.plan_code,
                    status:agent.status,
					amount:agent.amount

					
				})
				var mailOptions = {
					from: process.env.SERVICE_MAIL,
					to: agent.email,
					subject: 'WELCOME',
					html: content,
				}
				await mail.send(mailOptions)

				return true



		
					
			default:
				//console.log('OTHER', data)
				//channel.nack(data)
				break
		}
	} catch (error) {
		console.error('Error processing message:', error)
		ack(data)
		// Handle error if needed
	}
}
module.exports = { mailServices }
