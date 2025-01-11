const mongoose = require('mongoose')
const Organization_ = require('../schema/organization')
const Agent_ = require('../schema/agent')
const Asset_ = require('../schema/asset')
const Customer_ = require('../schema/customer')
const jsonwebtoken = require('jsonwebtoken')

const deleteFile = require('../function/s3/delete_file')
class Asset{

    async add1({workspace,name,url,size,format,tags}) {
        try {
            const result = new Asset_({workspace,name,url,size,format,tags:tags}).save()
            return result 
        } catch (error) {
            console.error(error)
            throw error
        }
    }
//final
    async add({name,url,size,format,type,tags}) {
        try {
            const result = new Asset_({name,url,size,format,type:type,tags:tags}).save()
            console.log("saved asset:", result);
            return result 
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async list({workspace,tags}) {
        try {
            var result
            if(tags){
                 result = await Asset_.find({ workspace,tags:tags })
            }else{
                result = await Asset_.find({ workspace})
            }
            
            return result
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async  fetch({ workspace, filename }) {
        try {
            const result = await Asset_.find({ workspace, name: filename}).lean();
            return result;
        } catch (error) {
            console.error("Error fetching assets:", error);
            throw error;
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

    async delete({workspace, asset_id,url}) {
        try {
            const result = await Asset_.deleteOne(
                { workspace: workspace, _id: asset_id }
            );

            if (result.deletedCount === 0) {
                throw new Error('Asset not found');
            }

            const key = url.split('.com/').pop()
            var del = await deleteFile(key)
            if (del) {
                const remove = await Asset_.deleteOne(
                    { workspace: workspace, _id: asset_id }
                )
            }

            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}
module.exports=Asset