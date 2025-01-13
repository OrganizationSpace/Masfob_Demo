const organizationModel = require('../schema/organization');
const Workflow_ = require('../schema/workflow')
const Asset_ = require('../schema/asset')
const Keyword_ = require('../schema/keyword')
const { getFileType } = require('../function/workflowfn');
const axios = require('axios');

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

//add workflow by workspace
async addWithWorkspace({flow,workspace}) { // Accepts 'data' directly
        try {
            const organization = await organizationModel.findOne({workspace:workspace});
            console.log(organization); 
            if(organization==null){
                return {error:'workspace not found'}
            }
            
      const formattedFlows = flow.map((workflow) => ({
        workspace: organization.workspace,
        id: workflow.id,
        name: workflow.name,
        question: workflow.question,
        answer: {
          link: workflow.answer.link,
          text: workflow.answer.text,
          button: workflow.answer.button.map((button) => ({
            id: button.id,
            label: button.label,
            nextFlowId: button.nextFlowId,
          })),
        },
      }));
      const result = await Workflow_.insertMany(formattedFlows); // Correct insertMany usage
      return result;

      // Respond with the formatted structure
   
    } catch (error) {
      console.error('Error fetching workflows:', error);
      res.status(500).json({ message: 'Error fetching workflows', error });
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

}

module.exports = workflowController;
