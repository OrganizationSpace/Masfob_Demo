const Test_ = require('../schema/test')
const Asset_ = require('../schema/asset')
const { getFileType } = require('../function/workflowfn');

class testController {

    async addWorkflow({ newWorkflow }) {
      try {
        // Insert the entire newWorkflow object into the database
        const result = await Test_.insertMany([newWorkflow]); // Ensure newWorkflow is wrapped in an array
        console.log('Saved workflow:', result);
    
        return result;
      } catch (error) {
        console.error('Error in adding workflows:', error);
        throw error;
      }
    }

    //final
    async fetchAsset({ name }) {
      try {
        const result = await Asset_.findOne({ name: name }, { url: 1, extension: 1 ,type: 1});
        return result // Return the asset and file type properly
      } catch (error) {
        console.error('Error finding asset in database:', error.message);
        throw error;
      }
    }

}

module.exports = testController;