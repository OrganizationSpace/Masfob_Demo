const mongoose = require('mongoose')
const Organization = require('./schema/organization')
const Agent = require('./schema/agent')
const Asset = require('./schema/asset')
const Customer = require('./schema/customer')
const jsonwebtoken = require('jsonwebtoken')
const deleteFile = require('./function/s3/delete_file')

class Masfob {
    async createOrganization(data) {
        try {
            const organization = new Organization(data)
            const result = await organization.save()

            return { result }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async exitingWorkspace(workspace) {
        try {
            const organization = await Organization.findOne({ workspace })
            return organization
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async loginOrganization(data) {
        try {
            const organization = new Organization(data)

            return { organization }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async fetchOrganizations(workspace) {
        try {
            const organizations = await Organization.findOne({ workspace: workspace }).lean()
           console.log(organizations);
           console.log("++++++++++++");
            return  organizations 
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async updateOrganizationName(workspace, organization_name) {
        try {
            //test the query
            const updatedOrganization = await Organization.findOneAndUpdate(
                { workspace: workspace },
                { $set: {organization_name:organization_name }},
                {new:true}
            )
            return updatedOrganization
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async updateOrganizationLogo(workspace, logo) {
        try {
            
            const updatedOrganization = await Organization.findOneAndUpdate(
                { workspace: workspace },
                {
                    $set: {
                        logo: logo,
                    },
                },
                { new: true }
            );
    
            return updatedOrganization;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    

    async deleteOrganization(workspace) {
        try {
            //test the query
            const deletedOrganization = await Organization.deleteOne({
                workspace: workspace,
            })

            if (!deletedOrganization) {
                throw new Error('Organization not found')
            }

            return { deletedOrganization }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /////////////////////////////////////////////Agent//////////////////////////////////////////////////////

    async addAgent(data) {
        try {
            const agent = new Agent(data)
            const result = await agent.save()
            return { result }
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async agentLogin(workspace, email, password) {
        try {
            const agent = await Agent.findOne({ workspace, email, password })

            if (!agent) {
                return { error: 'Invalid credentials' }
            }

            if (agent.role !== 'SUPERADMIN') {
                return { error: 'SUPERADMIN only allowed' }
            }

            const token = jsonwebtoken.sign(
                {
                    agentId: agent._id,
                    workspace: agent.workspace,
                    role: agent.role,
                    email: agent.email

                },
                process.env.SECRET,
                {}
            )

            return { token }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async listAgents(workspace) {
        try {
            const agents = await Agent.find({ workspace })
            return { agents }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async updateAgent(workspace, role, email) {
        try {
            const updatedAgent = await Agent.findOneAndUpdate(
                { workspace: workspace, email: email }, { $set: { role: role } },

                { new: true }
            )

            if (!updatedAgent) {
                throw new Error('Agent not found')
            }

            return { updatedAgent }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async deleteAgent(workspace, email) {
        try {
            //change the query to delete the agent
            const deletedAgent = await Agent.deleteOne(
                { workspace: workspace, email: email }
            )

            if (!deletedAgent) {
                throw new Error('Agent not found')
            }

            return { deletedAgent }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    ///////////////////////////////////asset/////////////////////////////////////////////

    async addAsset(data) {
        try {
            const asset = new Asset(data)
            const result = await asset.save()
            return { result }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async listAssets(workspace) {
        try {
            const assets = await Asset.find({ workspace })
            return { assets }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    // async updateAsset(id, newData) {
    // 	try {
    // 		const updatedAsset = await Asset.findOneAndUpdate(
    // 			{ _id: id },
    // 			{ $set: newData },
    // 			{ new: true }
    // 		)

    // 		if (!updatedAsset) {
    // 			throw new Error('Asset not found')
    // 		}

    // 		return { updatedAsset }
    // 	} catch (error) {
    // 		console.error(error)
    // 		throw error
    // 	}
    // }

    async deleteAsset(workspace, asset_id,url) {
        try {
            const deletedAsset = await Asset.deleteOne(
                { workspace: workspace, _id: asset_id }
            );

            if (deletedAsset.deletedCount === 0) {
                throw new Error('Asset not found');
            }

            const key = url.split('.com/').pop()
            var del = await deleteFile(key)
            if (del) {
                const remove = await Asset.deleteOne(
                    { workspace: workspace, _id: asset_id }
                )
            }

            return { deletedAsset };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /////////////////////////////Customer///////////////////////////////////

    async addCustomer(data) {
        try {
            const Customers = new Customer(data)
            const result = await Customers.save()
            return { result }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async importCustomer(data) {
        try {
            if (!Array.isArray(data)) {
                throw new Error('Input must be an array of Customers')
            }

            const result = await Customer.insertMany(data)
            return { result }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async listCustomers(workspace) {
        try {
            //check the query
            const Customers = await Customer.find({ workspace })
            return { Customers }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async updateCustomer(phone_number, workspace, newData) {
        try {
            //check the query
            const updatedCustomer = await Customer.findOneAndUpdate(
                { phone_number: phone_number, workspace: workspace },
                newData,
                { new: true }
            )

            if (!updatedCustomer) {
                throw new Error('Customer not found')
            }

            return { updatedCustomer }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async deleteCustomer(workspace, ids) {
        try {
            //test the query
            const deletedCustomer = await Customer.deleteMany(
                { workspace: workspace, _id: ids }
            )
            if (!deletedCustomer) {
                throw new Error('Customer not found')
            }

            return { deletedCustomer }
        } catch (error) {
            console.error(error)
            throw error
        }
    }
////////// organization label add//////////////////////////
async addOrganizationLabel(workspace, customer_labels) {
    try {
        const result = await Organization.updateOne(
            { workspace: workspace },
            { $push: { customer_labels: customer_labels } },
            { new: true } 

        );

       
      

        return { result };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async updateOrganization(workspace, role, email) {
    try {
        const updatedAgent = await Agent.findOneAndUpdate(
            { workspace: workspace, email: email }, { $set: { role: role } },

            { new: true }
        )

        if (!updatedAgent) {
            throw new Error('Agent not found')
        }

        return { updatedAgent }
    } catch (error) {
        console.error(error)
        throw error
    }
}

async updateOrganizationBiller(workspace, billing_details) {
    try {
        const updatedAgent = await Organization.findOneAndUpdate(
            { workspace: workspace }, { $set: { billing_details: billing_details } },

            { new: true }
        )

        if (!updatedAgent) {
            throw new Error('Agent not found')
        }

        return { updatedAgent }
    } catch (error) {
        console.error(error)
        throw error
    }
}



async listLabel(workspace) {
    try {
        const result = await Organization.findOne(
            { workspace: workspace },
            { customer_labels: 1, _id: 0 } // Projection to include only the Customer_labels field
        );

        if (!result) {
            throw new Error('Organization not found');
        }

        return { customer_labels: result.customer_labels || [] };
    } catch (error) {
        console.error(error);
        throw error;
    }
}


async labelDeleteAssign(workspace, labels) {
    try {
        const deleteResult = await Organization.updateMany(
            { workspace: workspace },
            { $pull: { customer_labels: { $in: labels } } }, 
            { new: true }
        );
        const Result = await Customer.updateMany(
            { workspace: workspace },
            { $pull: {labels: { $in: labels } } }, 
            { new: true }
        );

        return { deleteResult,Result }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async listLabelAssign(workspace, ids, labels) {
    try {
        const result = await Customer.updateMany(
            { workspace: workspace, _id: { $in: ids } },
            { $set: { labels: labels } },
            { new: true }
        );

        if (result.nModified === 0) {
            throw new Error('No customers found or updated');
        }

        return { result };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async deleteLabel(workspace, customer_labels) {
    try {
        const updatedDelete = await Organization.findOneAndUpdate(
            { workspace: workspace },
            { $pull: { customer_labels: customer_labels } }
        );

        

        return { success: true, message: 'Label deleted successfully', updatedDelete };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

}

module.exports = Masfob
