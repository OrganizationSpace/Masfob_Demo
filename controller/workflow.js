const WorkflowModel = require('../schema/workflow'); // Import the Workflow schema/model
const organizationModel = require('../schema/organization');
const Organization = require('./organization');
// class workflowController {
//     async add({flow}) { // Accepts 'data' directly
//         try {
//             const result = await WorkflowModel.insertMany(flow); // Correct insertMany usage
//             return result;
//         } catch (error) {
//             console.error('Error in adding workflows:', error);
//             throw error;
//         }
//     }
// }

class workflowController {
    async add({flow,workspace}) { // Accepts 'data' directly
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
      const result = await WorkflowModel.insertMany(formattedFlows); // Correct insertMany usage
      return result;

      // Respond with the formatted structure
   
    } catch (error) {
      console.error('Error fetching workflows:', error);
      res.status(500).json({ message: 'Error fetching workflows', error });
    }
  }
}





module.exports = workflowController;



