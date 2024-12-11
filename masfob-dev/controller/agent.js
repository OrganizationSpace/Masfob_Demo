const mongoose = require('mongoose')
const Organization_ = require('../schema/organization')
const Agent_ = require('../schema/agent')
const Asset = require('../schema/asset')
const Customer = require('../schema/customer')
const jsonwebtoken = require('jsonwebtoken')
const deleteFile = require('../function/s3/delete_file')
class Agent {
	async add({ workspace, name, role, email, password, session }) {
		try {
			const result = new Agent_({
				workspace,
				name,
				role,
				email,
				password,
			}).save({ session })

			//  const result = await agent.save()
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async isExisting({ email }) {
		try {
			const result = await Agent_.findOne({ email })
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async isExistingAgent({ workspace, email }) {
		try {
			const result = await Agent_.findOne({ workspace, email }).lean()
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async setPassword({ workspace, email, password }) {
		try {
			const result = await Agent_.findOneAndUpdate(
				{ workspace: workspace, email: email },
				{ $set: { password: password } },

				{ new: true }
			)

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}
	// async agentLogin({workspace, email, password}) {
	//     try {
	//         const agent = await Agent_.findOne({ workspace, email, password })

	//         if (!agent) {
	//             return { error: 'Invalid credentials' }
	//         }

	//         // if (agent.role !== 'SUPERADMIN') {
	//         //     return { error: 'SUPERADMIN only allowed' }
	//         // }

	//         const token = jsonwebtoken.sign(
	//             {
	//                 agentId: agent._id,
	//                 workspace: agent.workspace,
	//                 role: agent.role,
	//                 email: agent.email,
	//                 name:agent.name,
	//                 teams:agent.teams
	//             },
	//             process.env.SECRET,
	//            // { expiresIn: '5s' } // Set the token expiration to 5 seconds

	//         )

	//         return { token }
	//     } catch (error) {
	//         console.error(error)
	//         throw error
	//     }
	// }

	// async fetch({workspace, email, password}) {
	//     console.log("++++++++++++++++++++++++++++++++++++++")

	//     console.log(workspace)
	//   console.log(email)
	//   console.log(password)
	//   console.log("++++++++++++++++++++++++++++++++++++++")

	//     try {
	//         const result = await Agent_.findOne({ workspace, email, password })

	// console.log("++++++++++++++++++++++++++++++++++++++")
	// console.log(result)
	// console.log("++++++++++++++++++++++++++++++++++++++")
	//         return  result

	//     } catch (error) {
	//         console.error(error)
	//         throw error
	//     }
	// }
	// info
	async fetch({  email, password }) {
		try {
			const result = await Agent_.findOne({  email, password }).lean()
//console.log("agent_fetch",result);
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async list({ workspace }) {
		try {
			const result = await Agent_.find({ workspace })
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async listSuperAdmin({ page, query }) {
		try {
			const limit = 7
			var criteria = {}
			if (query) {
				const superadminRegex = new RegExp(query, 'i')
				criteria.superadmin_name = superadminRegex
			}
			const result = await Agent_.find(
				{ role: 'SUPERADMIN' },
				{ role: 0, password: 0, teams: 0 }
			)
				.sort({ created_at: -1 })
				.skip(page * limit)
				.limit(limit)
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async agentInfo({ workspace, email }) {
		try {
			const result = await Agent_.findOne({ workspace, email }, { password: 0 })
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async changeRole({ workspace, role, email }) {
		try {
			const result = await Agent_.findOneAndUpdate(
				{ workspace: workspace, email: email },
				{ $set: { role: role } },

				{ new: true }
			)

			if (!result) {
				throw new Error('Agent not found')
			}

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}
	//indesk use controller

	async teamAdd({ workspace, email, team }) {
		try {
			const result = await Agent_.updateMany(
				{ workspace: workspace, email: { $in: email } },
				{ $push: { teams: team } },
				{ new: true }
			)

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	//indesk use controller
	async teamRemove({ workspace, email, team }) {
		try {
			const result = await Agent_.updateMany(
				{ workspace: workspace, email: { $in: email } },
				{ $pull: { teams: { $in: [team] } } },
				{ new: true }
			)

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async addToTeam({ workspace, email, team }) {
		try {
			const result = await Agent_.findOneAndUpdate(
				{ workspace: workspace, email: email },
				{ $push: { teams: team } },
				{ new: true }
			)

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async removeFromTeam({ workspace, email, team }) {
		try {
			const result = await Agent_.updateOne(
				{ workspace: workspace, email: email },
				{ $pull: { teams: team } },
				{ new: true }
			)

			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async delete({ workspace, email }) {
		try {
			//console.log('workEmail', workspace, email)

			// Use findOne to fetch a single agent document
			const fetch_agent = await Agent_.findOne({
				workspace: workspace,
				email: email,
			}).lean()
		

			// Check if the agent exists
			if (!fetch_agent) {
				return { message: 'Agent not found' }
			}

			// Check if the agent is SUPERADMIN
			if (fetch_agent.role === 'SUPERADMIN') {
				return { message: 'Cannot delete its a SUPERADMIN' }
			}

			// Proceed to delete the agent
			const result = await Agent_.deleteOne({
				workspace: workspace,
				email: email,
			})

			return {
				name: fetch_agent.name,
				workspace: fetch_agent.workspace,
				email: fetch_agent.email,
				message: 'Agent deleted successfully'
			};
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	// async delete({workspace, email}) {
	//     try {
	//         //change the query to delete the agent
	//         const result = await Agent_.deleteOne(
	//             { workspace: workspace, email: email }
	//         )

	//         if (!result) {
	//             throw new Error('Agent not found')
	//         }

	//         return result
	//     } catch (error) {
	//         console.error(error)
	//         throw error
	//     }
	// }

	// async changeRole(workspace, role, email) {
	//     try {
	//         const updatedAgent = await Agent_.findOneAndUpdate(
	//             { workspace: workspace, email: email }, { $set: { role: role } },

	//             { new: true }
	//         )

	//         if (!updatedAgent) {
	//             throw new Error('Agent not found')
	//         }

	//         return { updatedAgent }
	//     } catch (error) {
	//         console.error(error)
	//         throw error
	//     }
	// }
}
module.exports = Agent
