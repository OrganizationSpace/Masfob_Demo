const jsonwebtoken = require('jsonwebtoken')
     
const generateAgentToken = (data, expiry) => {
	const token = jsonwebtoken.sign(
		{
			agentId: data._id,
			workspace: data.workspace,
			role: data.role,
			email: data.email,
			name: data.name,
			//teams: data.teams,
		},
		process.env.SECRET,
		{
			expiresIn: expiry, // Expiry set to 5 seconds
		}
	)
	return token
}

const generateClientToken = (data) => {
	const token = jsonwebtoken.sign(
		{
			clientId: data._id,
			name:data.name,
			workspace: data.workspace,
			phone_number:data.phone_number,
			country_code:data.country_code,
			email: data.email,
		},
		process.env.SECRET
	)
	return token
}

module.exports = { generateAgentToken, generateClientToken }
