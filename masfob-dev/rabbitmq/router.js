const { setChannel, sendToQueue, ack, nack } = require('./channel')
const { mailServices } = require('../function/mail_service')
async function brokerRouter(data) {
	try {
		var payload = JSON.parse(Buffer.from(data.content).toString())
		//console.log(payload.action)
		switch (payload.action) {
			case 'SERVICE_MAIL':
				 console.log('###### SERVICE MAIL ####')
				const result = await mailServices(payload.data)
				if (result) ack(data)
				break
			case 'c2':
				//console.log('c2', data)
				//nack(data)
				break
			case 'c3':
			//	console.log('c3', data)
				ack(data)
				break
			default:
			//	console.log('OTHER', payload.data)
				//channel.nack(data)
				break
		}
	} catch (error) {
		console.error('Error processing message:', error)
		ack(data)
		// Handle error if needed
	}
}
module.exports = brokerRouter
