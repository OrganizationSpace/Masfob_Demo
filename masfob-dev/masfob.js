const mongoose = require('mongoose')
const Organization = require('./schema/organization')
const Agent = require('./schema/agent')
const Asset = require('./schema/asset')
const Customer = require('./schema/customer')
const jsonwebtoken = require('jsonwebtoken')
const deleteFile = require('./function/s3/delete_file')

class Masfob {
    async createOrganization({organization_name,workspace,billing_details}) {
        try {
            const organization = new Organization({organization_name,workspace,billing_details})
            const result = await organization.save()

            return { result }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async exitingWorkspace({workspace}) {
        try {
            const organization = await Organization.findOne({ workspace })
            return organization
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async loginOrganization({
        email,
        password,
        workspace,
    }) {
        try {
            const organization = new Organization({
                email,
                password,
                workspace,
            })

            return { organization }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async fetchOrganizations({workspace}) {
        try {
           // console.log(workspace)
            const organizations = await Organization.findOne({ workspace: workspace }).lean()
           // console.log(organizations)
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

    async agentAdd({workspace,name,role,email,password}) {
        try {
            const agent = new Agent({workspace,name,role,email,password})
            const result = await agent.save()
            return { result }
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async agentLogin({workspace, email, password}) {
        try {
            const agent = await Agent.findOne({ workspace, email, password })

            if (!agent) {
                return { error: 'Invalid credentials' }
            }

            // if (agent.role !== 'SUPERADMIN') {
            //     return { error: 'SUPERADMIN only allowed' }
            // }

            const token = jsonwebtoken.sign(
                {
                    agentId: agent._id,
                    workspace: agent.workspace,
                    role: agent.role,
                    email: agent.email,
                    name:agent.name,
                    teams:agent.teams
                },
                process.env.SECRET,
               // { expiresIn: '5s' } // Set the token expiration to 5 seconds
                
            )

            return { token }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async agentList({workspace}) {
        try {
            const agents = await Agent.find({ workspace })
            return { agents }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async agentUpdate({workspace, role, email}) {
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


    async agentteamAdd({workspace,email,team}) {
        try {
            const assignteams = await Agent.updateMany(
                { workspace: workspace, email: { $in: email }  },
                { $push: { teams: team } },
                { new: true }
            );
           
            return { assignteams };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async agentteamDelete({workspace,email,team}) {
        try {
            const assignteams = await Agent.updateMany(
                { workspace: workspace, email: { $in: email }  },
                { $pull: { teams: { $in: [team] } } },
                { new: true }
            );
           
            return { assignteams };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async agentaddTeam({workspace,email,team}) {
        try {
            const agentadd = await Agent.updateOne(
                { workspace: workspace, email: email  },
                { $push: { teams: team } },
                { new: true }
            );
           
            return agentadd;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async agentdeleteTeam({workspace,email,team}) {
        try {
            const agentadd = await Agent.updateOne(
                { workspace: workspace, email: email  },
                { $pull: { teams: team } },
                { new: true }
            );
           
            return agentadd;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async agentDelete({workspace, email}) {
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
    ///////////////////////////////////Client////////////////////////////////////////////

    async clientLogin({workspace, email, password,tag}) {
        try {
            const client = await Customer.findOne({ workspace, email, password,tags: { $elemMatch: { $in: tag } } })

            if (!client) {
                return { error: 'Invalid credentials' }
            }

            const token = jsonwebtoken.sign(
                {   
                    clientId: client._id,
                    workspace: client.workspace,
                    email: client.email,
                   // name: client.name || 'undefined',

                },
                process.env.SECRET,
               // { expiresIn: '5s' } // Set the token expiration to 5 seconds
                
            )

            return { token }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async clientAdd({workspace,email,password,name,tag}) {
        try {
            const customer = new Customer({workspace,email,password,name,tags:[tag]})
            const result = await customer.save()
            return { result }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async clientPictureupload({workspace,email,url}) {
        try {
            const picture_upload = await Customer.updateOne(
                { workspace,email },
                {  profile_picture: url  } , 
                { new: true }
            );
           
            return picture_upload;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    
    async profileFetch({workspace,email}) {
        try {
            const clientProfile_fetch = await Customer.findOne({ workspace: workspace,email:email, },{ password: 0 }).lean()
            return  clientProfile_fetch 
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async clientList({workspace,tag}) {    
        try {
            const customer = await Customer.find({ workspace ,tags: tag})
            return { customer }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async clientDelete({workspace, email,tag}) {
        try {
            //change the query to delete the agent
            const deletedcustomer = await Customer.deleteMany(
                { workspace: workspace, email: email,tags: tag }
            )

            if (!deletedcustomer) {
                throw new Error('client not found')
            }

            return { deletedcustomer }
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    ///////////////////////////////////asset/////////////////////////////////////////////

    async assetAdd({workspace,name,url,size,format,tags}) {
        try {
            const asset = new Asset({workspace,name,url,size,format,tags})
            const result = await asset.save()
            return { result }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async assetList({workspace}) {
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

    async assetDelete({workspace, asset_id,url}) {
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

    async customerAdd({workspace,name,display_name,phone_number,country_code,tags}) {
        try {
            const Customers = new Customer({workspace,name,display_name,phone_number,country_code,tags})
            const result = await Customers.save()
            return { result }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async customerImport({Customers}) {
        try {
            if (!Array.isArray(Customers)) {
                throw new Error('Input must be an array of Customers')
            }

            const result = await Customer.insertMany(Customers)
            return { result }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async customerList({workspace}) {
        try {
            //check the query
            const Customers = await Customer.find({ workspace })
            return { Customers }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    // async updateCustomer({phone_number, workspace, newData}) {
    //     try {
    //         //check the query
    //         const updatedCustomer = await Customer.findOneAndUpdate(
    //             { phone_number: phone_number, workspace: workspace },
    //             newData,
    //             { new: true }
    //         )

    //         if (!updatedCustomer) {
    //             throw new Error('Customer not found')
    //         }

    //         return { updatedCustomer }
    //     } catch (error) {
    //         console.error(error)
    //         throw error
    //     }
    // }

    async customerUpdate({ phone_number, workspace, newData }) {
        try {
            // Destructure properties from newData
            const { name, display_name, tags } = newData;
    
            // check the query
            const updatedCustomer = await Customer.findOneAndUpdate(
                { phone_number: phone_number, workspace: workspace },
                {
                    name: name,
                    display_name: display_name,
                    country_code: '91',
                    tags: tags,
                },
                { new: true }
            );
    
            if (!updatedCustomer) {
                throw new Error('Customer not found');
            }
    
            return { updatedCustomer };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    async deleteCustomer({workspace, phone_number}) {
        try {
            //test the query
            const deletedCustomer = await Customer.deleteMany(
                { workspace: workspace, phone_number: phone_number }
            )
           
            return { deletedCustomer }
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    // async  deleteCustomer({ workspace, phone_numbers }) {
    //     try {
    //         // Test the query
    //         const deletedCustomer = await Customer.deleteMany({
    //             workspace: workspace,
    //             phone_number: phone_numbers,
    //         });
    //         if (deletedCustomer.deletedCount === 0) {
    //             throw new Error('Customer not found');
    //         }
    //         return { deletedCustomer };
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }
////////// organization label add//////////////////////////

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

async updateOrganizationBiller({workspace, billing_details}) {
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

async OrganizationLabeladd({workspace,customer_labels}) {
    try {
        const addlabel = await Organization.findOneAndUpdate(
            { workspace: workspace },
            { $push: { customer_labels: customer_labels  } }, 
            { new: true }
        );
       
        return addlabel ;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async labelList({workspace}) {
    try {
        const result = await Organization.findOne(
            { workspace: workspace },
            { customer_labels: 1, _id: 0 } // Projection to include only the Customer_labels field
        );
        
        if (!result) {
            throw new Error('Label not found');
        }

        return  result.customer_labels;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


async labelAssign({workspace, phone_number, labels}) {       
    try {
        const result = await Customer.findOneAndUpdate(
            { workspace: workspace, phone_number: phone_number },
            { $push: { labels: labels } },
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


async labelDelete({ workspace, labels }) {
    try {
        const deleteResult = await Organization.findOneAndUpdate(
            { workspace: workspace },
            { $pull: { customer_labels:  labels  } },
            {new:true}
        );

        const Result = await Customer.findOneAndUpdate(
            { workspace: workspace },
            { $pull: { labels: labels  } },
            {new:true}
        );

        return { deleteResult };
    } catch (error) {
        console.error(error);
        throw error;
    }
}



// async deleteLabel({workspace, customer_labels}) {
//     try {
//         const updatedDelete = await Organization.findOneAndUpdate(
//             { workspace: workspace },
//             { $pull: { customer_labels: customer_labels } }
//         );

        

//         return { success: true, message: 'Label deleted successfully', updatedDelete };
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

}

module.exports = Masfob
