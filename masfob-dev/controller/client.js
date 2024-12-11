const mongoose = require('mongoose')
const Organization_ = require('../schema/organization')
const Agent_ = require('../schema/agent')
const Asset_ = require('../schema/asset')
const Customer_ = require('../schema/customer')
const jsonwebtoken = require('jsonwebtoken')
const deleteFile = require('../function/s3/delete_file')

class Client{
    // async clientLogin({workspace, email, password,tag}) {
    //     try {
    //         const client = await Customer_.findOne({ workspace, email, password,tags: { $elemMatch: { $in: tag } } })

    //         if (!client) {
    //             return { error: 'Invalid credentials' }
    //         }

    //         const token = jsonwebtoken.sign(
    //             {   
    //                 clientId: client._id,
    //                 workspace: client.workspace,
    //                 email: client.email,
    //                // name: client.name || 'undefined',

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

    async isExisting({email}) {
        try {
            const result = await Customer_.findOne({ email })
            return result
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async fetch({workspace, email, password}) {
        try {
            const result = await Customer_.findOne({ workspace, email, password })

            //tags: { $elemMatch: { $in: tag } }
            // if (!client) {
            //     return { error: 'Invalid credentials' }
            // }

            return  result 
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    
    async add({workspace,email,display_name,country_code,phone_number,password,name,tag}) {
        try {
            const result = new Customer_({workspace,email,display_name,password,country_code,phone_number,name,tags:tag}).save()
           // const result = await customer.save()
            return result 
        } catch (error) {
            console.error(error)
            throw error
        }
    }


    async uploadPicture({workspace,email,url}) {
        try {
            const result = await Customer_.updateOne(
                { workspace,email },
                {  profile_picture: url  } , 
                { new: true }
            );
           
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    
    async fetchProfile({workspace,email}) {
        try {
            const result = await Customer_.findOne({ workspace: workspace,email:email, },{ password: 0 }).lean()
            return  result 
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async list({workspace,tag}) {    
        try {
            const result = await Customer_.find({ workspace ,tags: tag})
            return result
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async delete({workspace, email,tag}) {
        try {
            //change the query to delete the agent
            const result = await Customer_.deleteMany(
                { workspace: workspace, email: email,tags: tag }
            )

            if (!result) {
                throw new Error('client not found')
            }

            return result
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async update({workspace,email,display_name,phone_number,password,name,tag,labels}) {
        try {
            const result = new Customer_({workspace,email,password,display_name,phone_number,name,labels,tags:tag}).save()
            return result 
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async addLabels({_id, labels}) {
		try {
			const updatedClient = await Customer_.findOneAndUpdate(
				_id,
				{ $push: { labels } },
				{ new: true }
			);
			return updatedClient;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}


    async updateExisting({  email, display_name, phone_number, country_code, password, name, tag }) {
        try {
            const result = await Customer_.findOneAndUpdate(
                { email },
                { 
                    $set: {
                        name, 
                        display_name, 
                        phone_number, 
                        country_code, 
                        password, 
                        tag 
                    }
                },
                { upsert: true, returnDocument: 'after' }
            );
          //  console.log("existing_email_update", result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

}
module.exports=Client
