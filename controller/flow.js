//const Flow = require('../schema/Flow');

// class FlowController {
//   // async add({ name, nodes, edges }) {
//   //   try {
//   //     // Create a new flow document
//   //     const flow = await Flow({
//   //       name,
//   //       nodes,
//   //       edges,
//   //     });

//   //     // Save the flow to the database
//   //     await flow.save();

//   //     // Return the saved flow
//   //     return flow;
//   //   } catch (error) {
//   //     console.error('Error creating flow:', error);
//   //     // Re-throw the error to handle it in the route
//   //     throw new Error('Error creating flow');
//   //   }
//   // }
// async list({}) { 
//   try {
//     const result = await Flow.find(); 
//     console.log('result:',result);
//     return result;

// } catch (error) {
// console.error('Error fetching workflows:', error);
// res.status(500).json({ message: 'Error fetching workflows', error });
// }
// }
//module.exports = new FlowController;

const Workflow = require('../schema/flow');
const generateUniqueId = require('../function/generatedUniqueId');

class WorkflowController {
  // Create a new workflow
  async createWorkflow({ id, name, question, node_type, answer, workspace, waba_id, phone_number_id, nodes, edges }) {
    try {
      const workflow = new Workflow({
        id,
        name,
        question,
        node_type,
        answer,
        workspace,
        waba_id,
        phone_number_id,
        nodes,
        edges,
      });``

      await workflow.save();
      return workflow;
    } catch (error) {
      console.error('Error creating workflow:', error);
      throw new Error('Error creating workflow');
    }
  }
  
  async addWorkflows({ newWorkflow }) {
    try {
      console.log("Attempting to save workflow:", JSON.stringify(newWorkflow, null, 2));
      newWorkflow.id = newWorkflow.id || generateUniqueId(); // Generate ID if not provided
      const workflow = new Workflow(newWorkflow);
      const result = await workflow.save();
      console.log("Workflow saved successfully:", result);
      return result;
    } catch (error) {
      console.error("Error saving workflow:", error.message);
      throw error;
    }
  }
  

   // Get all workflows
   async getAllWorkflows() {
    try {
      return await Workflow.find();
    } catch (error) {
      console.error('Error fetching workflows:', error);
      throw new Error('Error fetching workflows');
    }
  }

  // Get a workflow by ID
  async getWorkflowById(id) {
    try {
      const workflow = await Workflow.findById(id);
      if (!workflow) {
        throw new Error('Workflow not found');
      }
      return workflow;
    } catch (error) {
      console.error('Error fetching workflow by ID:', error);
      throw new Error('Error fetching workflow by ID');
    }
  }

   // Update a workflow by ID
   async updateWorkflow(id, updates) {
    try {
      const workflow = await Workflow.findByIdAndUpdate(id, updates, { new: true });
      if (!workflow) {
        throw new Error('Workflow not found');
      }
      return workflow;
    } catch (error) {
      console.error('Error updating workflow:', error);
      throw new Error('Error updating workflow');
    }
  }

  // Delete a workflow by ID
  async deleteWorkflow(id) {
    try {
      const workflow = await Workflow.findByIdAndDelete(id);
      if (!workflow) {
        throw new Error('Workflow not found');
      }
      return workflow;
    } catch (error) {
      console.error('Error deleting workflow:', error);
      throw new Error('Error deleting workflow');
    }
  }
}

module.exports = new WorkflowController;