const mongoose = require('mongoose')
const Organization_ = require('../schema/organization')
const jsonwebtoken = require('jsonwebtoken')
const deleteFile = require('../function/s3/delete_file')

class Organization{

    async create({organization_name,workspace,whatsapp_number,session}) {
        try {
            const result = new Organization_({organization_name,workspace,whatsapp_number}).save({session})
            return  result 
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async isExisting({workspace}) {
        try {
            const result = await Organization_.findOne({ workspace }).lean()
          //  console.log("workspace_isExisting",result);
            return result
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async info({workspace}) {
        try {
            const result = await Organization_.findOne({ workspace })
            return result
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    // async login({
    //     email,
    //     password,
    //     workspace,
    // }) {
    //     try {
    //         const organization = new Organization_({
    //             email,
    //             password,
    //             workspace,
    //         })

    //         return { organization }
    //     } catch (error) {
    //         console.error(error)
    //         throw error
    //     }
    // }

    async fetch({workspace}) {
        try {
            const result = await Organization_.findOne({ workspace: workspace }).lean()
           return  result 
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async updateName({workspace, organization_name}) {
        try {
            //test the query
            const result = await Organization_.findOneAndUpdate(
                { workspace: workspace },
                { $set: {organization_name:organization_name }},
                {new:true}
            )
            return result
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async updateLogo({workspace, logo}) {
        try {
            
            const result = await Organization_.findOneAndUpdate(
                { workspace: workspace },
                {
                    $set: {
                        logo: logo,
                    },
                },
                { new: true }
            );
    
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    async updateNumber({workspace, whatsapp_number}) {
        try {
            
            const result = await Organization_.findOneAndUpdate(
                { workspace: workspace },
                {
                    $set: {
                        whatsapp_number: whatsapp_number,
                    },
                },
                { new: true }
            );
    
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    async delete({workspace}) {
        try {
            //test the query
            const result = await Organization_.deleteOne({
                workspace: workspace,
            })

            if (!result) {
                throw new Error('Organization not found')
            }

            return  result 
        } catch (error) {
            console.error(error)
            throw error
        }
    }


async updateBiller({workspace, billing_details}) {
    try {
        const result = await Organization_.findOneAndUpdate(
            { workspace: workspace }, { $set: { billing_details: billing_details } },

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

async addLabel({workspace,customer_labels}) {
    try {
        const result = await Organization_.updateOne(
            { workspace: workspace },
            { $addToSet: { customer_labels: customer_labels  } }
          //  { new: true }
        );
     //  console.log(result);
        return result ;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async listLabel({workspace}) {
    try {
        const result = await Organization_.findOne(
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




// async labelDelete({ workspace, labels }) {
//     try {
//         const deleteResult = await Organization_.findOneAndUpdate(
//             { workspace: workspace },
//             { $pull: { customer_labels:  labels  } },
//             {new:true}
//         );

//         const Result = await Customer.findOneAndUpdate(
//             { workspace: workspace },
//             { $pull: { labels: labels  } },
//             {new:true}
//         );

//         return { deleteResult };
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }


async  deleteLabel({ workspace, customer_labels,session }) {
    try {
        const result = await Organization_.findOneAndUpdate(
            { workspace: workspace },
            { $pull: { customer_labels: customer_labels } },
            { new: true,session: session }
        );
        return result ;
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


module.exports = Organization
