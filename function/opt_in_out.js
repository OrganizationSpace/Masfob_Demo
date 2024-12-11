const Customer = require('../schema/customer')
async function optInOut(workspace, phone_number,opt) {
	try {
		const customer = await Customer.updateOne(
			{
				workspace: workspace,
				phone_number: phone_number
			},
			{
				$set: {
					opt_out: opt,
				},
			}
		)

		return {
			success: true,
			message: 'Successfully updated',
			data: customer,
		}
	} catch (error) {
		return {
			success: false,
			message: error.message,
			error,
		}
	}
}

module.exports = optInOut