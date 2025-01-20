const Workflow_ = require('../schema/workflow')
const Keyword_ = require('../schema/keyword')
const axios = require('axios');

class metaController {

async delete({id}) { 
    try {
      
      const result = await Workflow_.deleteOne({id: id}); 
      console.log('result:',result);
      return result;
  
  } catch (error) {
  console.error('Error fetching workflows:', error);
  res.status(500).json({ message: 'Error fetching workflows', error });
  }
  }
  
  async meta({ data }) {
    try {
      
      const result = await axios.post(
        `https://graph.facebook.com/v21.0/566917379828344/messages`,
  
        
        data,
        {
          headers: { 
            Authorization:`Bearer ${process.env.TOKEN}`,
              'Content-Type': 'application/json',
          },
        }
      )
  
      return result
    } catch (error) {
      //console.error(error)
      throw error
    }
  }
  
  //set data and send message
  async meta1({ param }) {
    try {
      const phone_number = param.phn_number;
      console.log(phone_number);
      const check = await Workflow_.findOne({ name: "Colour" });
      console.log('check',check);
      const link = check.answer.link;
      const text= check.answer.text;
      const labelOne = check.answer.button[0].label;
      console.log('labelOne',labelOne);
      const labelTwo = check.answer.button[1].label;
      console.log('labelTwo',labelTwo);
      const data = {
        "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": phone_number, 
  "type": "interactive",
  "interactive": {
    "type": "button",
    "header": {
    "type": "image",
    "image": {
      "link": link,
    }
    },
    "body": {
    "text": text,
    },
    
    "action": {
    "buttons": [
      {
      "type": "reply",
      "reply": {
        "id": "change-button",
        "title": labelOne || '',
      }
      },
      {
      "type": "reply",
      "reply": {
        "id": "cancel-button",
        "title": labelTwo,
      }
      }
    ]
    }
  }
  };	
        console.log('result1',data);
        
        const result = await axios.post(
                'https://graph.facebook.com/v21.0/566917379828344/messages',
                
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            console.log(result);
            
  
      return result
    } catch (error) {
      //console.error(error)
      throw error
    }
  }
  
  //add keyword by workflow name
  async keywordAdd({ data }) {
    try {
      const name = data.name;
      console.log('name:',name);
  
      const keyword = data.keyword;
      console.log('keyword:',keyword);
  
      const findName = await Workflow_.findOne({ name: name });
        console.log('findName:', findName);
    
      if (findName) {
        const addKeyword = new Keyword_({ name: findName.name, keyword: keyword });
        const savedKeyword = await addKeyword.save();
        console.log('addKeyword:', savedKeyword);
        return savedKeyword; 
      } else {
        console.log('name does not exist:', name);
        return { message: `Name ${name} does not exist.` }; 
      }
    } catch (error) {
      console.error('Error in keywordAdd:', error); 
      throw error; 
    }
  }
  
  //find keyword
  async fetchKeyword({ keyword }) {
    try {
        const fetchedKeyword = await Keyword_.findOne({ keyword });
        console.log('keyword:', fetchedKeyword);
        return fetchedKeyword;
    } catch (error) {
        console.error('Error in fetchKeyword:', error);
        throw error;
    }
  }
  
  async fetchWorkflowByNameAndType({ name }) {
    try {
        const fetchedWorkflow = await Workflow_.findOne({ name:name }); // Match both name and type
        console.log('workflow:', fetchedWorkflow);
        return fetchedWorkflow;
    } catch (error) {
        console.error('Error in fetchWorkflowByNameAndType:', error);
        throw error;
    }
  }
  

  //send message
  async sendMessage({ preparedMessage }) {
    try {
        const result = await axios.post(
            'https://graph.facebook.com/v21.0/566917379828344/messages',
            preparedMessage,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );
  
        console.log('WhatsApp API response data:', result.data);
        return result;
    } catch (error) {
        console.error('Error in sendMessage:', error.response?.data || error.message);
        throw error;
    }
  }



// //updated one with or without button
// async prepareMessageData({ fetchedWorkflow }) {
//   try {
//       if (!fetchedWorkflow || !fetchedWorkflow.answer) {
//           throw new Error('Workflow or answer not found.');
//       }

//       const { link, text, button = [], linkType } = fetchedWorkflow.answer;
//       console.log('Link:', link);
//       console.log('Text:', text);
//       console.log('LinkType:', linkType);

//      // Safely access button labels with default values
//       const labelOne = button[0]?.label || 'Button 1';
//       const labelTwo = button[1]?.label || 'Button 2';

//      // Now set the type link and other parameters based on the `type`
//       const data = {
//           "messaging_product": "whatsapp",
//           "recipient_type": "individual",
//           "to": 919566899489,
//           "type": "interactive",
//           "interactive": {
//               "type": "button",
//               "header": {
//                   "type": linkType, // LinkType will depend on your `type` value
//                   [linkType]: { "link": link }, // Set link dynamically based on type
//               },
//               "body": { "text": text },
//               "action": {
//                   "buttons": [
//                       {
//                           "type": "reply",
//                           "reply": { "id": "change-button", "title": labelOne },
//                       },
//                       {
//                           "type": "reply",
//                           "reply": { "id": "cancel-button", "title": labelTwo },
//                       },
//                   ],
//               },
//           },
//       };

//       console.log('Prepared message data:', JSON.stringify(data, null, 2));
//       return data;
//   } catch (error) {
//       console.error('Error in prepareMessageData:', error);
//       throw error;
//   }
// }

// //without header ,body , text and buttons only
// async prepareMessageData({ fetchedWorkflow }) {
//   try {
//     if (!fetchedWorkflow || !fetchedWorkflow.answer) {
//       throw new Error("Workflow or answer not found.");
//     }

//     const { link, text, button = [], linkType } = fetchedWorkflow.answer;
//     console.log("Link:", link);
//     console.log("Text:", text);
//     console.log("LinkType:", linkType);

//    // Safely access button labels with default values
//     const labelOne = button[0]?.label || '';
//     const labelTwo = button[1]?.label || '';

//    // Base message structure
//     const data = {
//       messaging_product: "whatsapp",
//       recipient_type: "individual",
//       to: 919566899489, // Replace with dynamic recipient if needed
//       type: "interactive",
//       interactive: {
//         type: "button",
//         action: {
//           buttons: [],
//         },
//       },
//     };

//     //Add buttons if available
//     if (button.length > 0) {
//       data.interactive.action.buttons = button.map((btn, index) => ({
//         type: "reply",
//         reply: {
//           id: `button-${index + 1}`,
//           title: btn.label || `Button ${index + 1}`,
//         },
//       }));
//     } else {
//      // Add default buttons if none are provided
//       data.interactive.action.buttons = [
//         {
//           type: "reply",
//           reply: { id: "change-button", title: labelOne },
//         },
//         {
//           type: "reply",
//           reply: { id: "cancel-button", title: labelTwo },
//         },
//       ];
//     }

// //    Add header if `linkType` and `link` are provided
//     if (linkType && link) {
//       data.interactive.header = {
//         type: linkType,
//         [linkType]: { link: link },
//       };
//     }

//     //Add body if `text` is provided
//     if (text) {
//       data.interactive.body = { text };
//      }
//     else {
//      // Add a fallback message if no text is provided
//       data.interactive.body = { text: "Please choose an option." };
//     }

//    // Handle fallback case where there are no header, body, or buttons
//     if (!linkType && !link && !text && button.length === 0) {
//       data.type = "text";
//       data.text = { body: "Default fallback message" };
//       delete data.interactive; // Remove the interactive field for a plain text message
//     }

//     console.log("Prepared message data:", JSON.stringify(data, null, 2));
//     return data;
//   } catch (error) {
//     console.error("Error in prepareMessageData:", error);
//     throw error;
//   }
// }

// //image and text only
// async prepareMessageData({ fetchedWorkflow }) {
//   try {
//     if (!fetchedWorkflow || !fetchedWorkflow.answer) {
//       throw new Error("Workflow or answer not found.");
//     }

//     const { link, text, button = [], linkType } = fetchedWorkflow.answer;
//     console.log("Link:", link);
//     console.log("Text:", text);
//     console.log("LinkType:", linkType);

//     // Base message structure for an image
//     const data = {
//       messaging_product: "whatsapp",
//       recipient_type: "individual",
//       to: 919566899489, // Replace with dynamic recipient if needed
//       type: "image",
//       image: {
//         link: link, // Image link from the fetchedWorkflow
//         caption: text || "Default caption message", // Use text for the caption or provide a fallback
//       },
//     };

//     // Handle case where no link or text is provided
//     if (!link) {
//       throw new Error("Image link is required.");
//     }

//     console.log("Prepared message data:", JSON.stringify(data, null, 2));
//     return data;
//   } catch (error) {
//     console.error("Error in prepareMessageData:", error);
//     throw error;
//   }
// }

// //text only
// async prepareMessageData({ fetchedWorkflow }) {
//   try {
//     if (!fetchedWorkflow || !fetchedWorkflow.answer) {
//       throw new Error("Workflow or answer not found.");
//     }

//     const { text} = fetchedWorkflow.answer;
//     console.log("Text:", text);

//  // Use the provided text or fallback to sample text
//  const messageText = text || "This is a sample text message."; // Default sample text

//     // Base message structure for text-only messages
//     const data = {
//       messaging_product: "whatsapp",
//       recipient_type: "individual",
//       to: 919566899489, // Replace with dynamic recipient if needed
//       type: "text",
//       text: {
//         body: messageText, // Use the provided text
//       },
//     };

//     console.log("Prepared message data:", JSON.stringify(data, null, 2));
//     return data;
//   } catch (error) {
//     console.error("Error in prepareMessageData:", error);
//     throw error;
//   }
// }

//final
async prepareMessageData({ fetchedWorkflow }) {
  try {
    if (!fetchedWorkflow || !fetchedWorkflow.answer) {
      throw new Error("Workflow or answer not found.");
    }

    const { link, text, button = [], linkType } = fetchedWorkflow.answer;
    console.log("Link:", link);
    console.log("Text:", text);
    console.log("LinkType:", linkType);
    console.log("Buttons:", button);

    // Ensure messaging_product is always included
    const data = {
      messaging_product: "whatsapp",  // Make sure this is always present
      recipient_type: "individual",
      to: 919566899489, // Replace with dynamic recipient if needed
    };

    // Handle plain text-only message
    if (text && !link && button.length === 0) {
      data.type = "text";
      data.text = {
        body: text,
      };
      console.log("Prepared message data (Text-only):", JSON.stringify(data, null, 2));
      return data;
    } else if (button.length > 0) {
      // Handle interactive message with buttons
      data.type = "interactive";
      data.interactive = {
        type: "button",
        body: {
          text: text || "Default button text", // Default button text
        },
        action: {
          buttons: button.map((btn, index) => ({
            type: "reply",
            reply: {
              id: `button-${index + 1}`,
              title: btn.label || `Button ${index + 1}`, // Default button label
            },
          })),
        },
      };
      console.log("Prepared message data (Interactive):", JSON.stringify(data, null, 2));
      return data;
    } else if (link && linkType && !text) {
      // Handle image without text
      data.type = "image";
      data.image = {
        link: link,
      };
      console.log("Prepared message data (Image):", JSON.stringify(data, null, 2));
      return data;
    } else if (link && linkType && text) {
      // Handle image with text
      data.type = "image";
      data.image = {
        link: link,
        caption: text,
      };
      console.log("Prepared message data (Image with Caption):", JSON.stringify(data, null, 2));
      return data;
    }

    // If no valid data, log and return null
    console.log("No valid data to prepare for sending.");
    return null;
  } catch (error) {
    console.error("Error in prepareMessageData:", error);
    throw error;
  }
}








}
module.exports = metaController;