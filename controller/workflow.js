const Workflow_ = require('../schema/workflow')
const Asset_ = require('../schema/asset')
const { getFileType } = require('../function/workflowfn');

class workflowController {

//add workflow
async add({ flow }) {
  try {
      for (let item of flow) {
          const linkType = getFileType(item.answer.link);
          console.log('linkType:',linkType);

          if (linkType === 'unknown') {
            console.log('Invalid link type for flow:', item.id);
              throw new Error(`Invalid link type for flow: ${item.id}. The link must point to an image, video, audio, or document.`);
          }

          // Add the linkType to the answer object
          item.answer.linkType = linkType;
          console.log(`Flow ${item.id} link type is ${linkType}`);
      }

      const result = await Workflow_.insertMany(flow); 
      console.log('result:',result);

      return result;
  } catch (error) {
      console.error('Error in adding workflows:', error);
      throw error;
  }
}

//final
async addWorkflows({ newWorkflow }) {
  try {
    // Insert the entire newWorkflow object into the database
    const result = await Workflow_.insertMany([newWorkflow]); // Ensure newWorkflow is wrapped in an array
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

//list  workflow
async fetch({key}) { 
    try {
      
      const result = await Workflow_.find({name: key}); 
      console.log('result:',result);
      return result;

} catch (error) {
  console.error('Error fetching workflows:', error);
  res.status(500).json({ message: 'Error fetching workflows', error });
}
}

//list all workflow
async list({}) { 
  try {
    
    const result = await Workflow_.find(); 
    console.log('result:',result);
    return result;

} catch (error) {
console.error('Error fetching workflows:', error);
res.status(500).json({ message: 'Error fetching workflows', error });
}
}

//delete keyword
async delete({id}) {
    try {
        
        const result = await Workflow_.deleteOne({ _id: id});
        console.log("deleted keyword:", result);
        return  result 
    } catch (error) {
        console.error('Error in deleting Keyword:', error); 
        throw error; 
    }
}

}

module.exports = workflowController;
