const organizationModel = require('../schema/organization');
const Workflow_ = require('../schema/workflow')
const Asset_ = require('../schema/asset')
const Keyword_ = require('../schema/keyword')
const { getFileType } = require('../function/workflowfn');
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
            Authorization:`Bearer EACCqGGtJE2oBOZBLmtRlZAwrq7ek13m2TyEyddIMZBaZCLmPjC8OeuGZAnnpG8Ltwk65NKisUBX1D8wg0wgC9PLZARURaoxauZAK2rBCZASjW3BTKtScfGuviKJiZBPaV0UQQRTvYf2qqkcgw3IU0Ge5ysAe2EhGriWniCq1b4fq7ZAMK9mJ2oCeTZCJknFTgs0Cde5YcqacSuzNMhK5eCRJyt0rMyvtF7v8qIARdvW`,
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
        "title": labelOne,
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
                        'Authorization': `Bearer EACCqGGtJE2oBOzpiGECWYwX0ZAd1vZAIPBEPLg6P8HO1FuvziTkWovPC4sKYeYrrSRgMnAXgn4hDS8SSDwJoPunmdOf9s61XKhli8SpsUf3bBSZBL3RWDGfQPFaJrMSwJC4EOZAccSdHRwzeinDpBFZC0ZAEhjTlQeFKyfHrAa1IPvE240IOZAZBQe3x4eLgNKgfZAh6ZB493BOZAgsWNsq9aBcwOnZAxZAk28IZAgnc4ZD`,
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
  
  // //find workflow
  // async fetchWorkflowByName({ name }) {
  //   try {
  //       const fetchedWorkflow = await Workflow_.findOne({ name});
  //       console.log('workflow:', fetchedWorkflow);
  //       return fetchedWorkflow;
  //   } catch (error) {
  //       console.error('Error in fetchWorkflowByName:', error);
  //       throw error;
  //   }
  // }
  // Find workflow by name and type
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
                    Authorization: `Bearer EACCqGGtJE2oBOZBBplgwwbrYvvVM8IqsYNjZA7gLahbNZAQVJX9NbfmZA3vOl7cJ0diha9ZAoKU76E0P6KxkzZAebpMLBQHWQmtI4ASwsecBB8iR3midh3gwqmUnBAkTzo8ZBEHMiD5kPsUZBwcv0OA44KGZBfmcAY2BGnN3wC4Bde3sFtgZCqYByntPqOFpsPBgqAZBWNlI2hNmfiSDDhCQc7z9LTgZB6U3SCkzsp3N`,
                    'Content-Type': 'application/json',
                },
            }
        );
  
        console.log('WhatsApp API response data:', result.data);
        return result;
    } catch (error) {
        console.error('Error in sendMessage:', error);
        throw error;
    }
  }
  
  // Prepare message data using the fetched workflow and type
  async prepareMessageData({ fetchedWorkflow }) {
    try {
        const { link, text, button, linkType } = fetchedWorkflow.answer;
        console.log('Link:', link);
        console.log('Text:', text);
        console.log('LinkType:', linkType);
  
        const labelOne = button[0].label;
        const labelTwo = button[1].label;
  
        console.log('Button labels:', labelOne, labelTwo);
  
        // Now set the type link and other parameters based on the `type`
        const data = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": 917305153529,
            "type": "interactive",
            "interactive": {
                "type": "button",
                "header": {
                    "type": linkType, // LinkType will depend on your `type` value
                    [linkType]: { "link":link }, // Set link dynamically based on type
                },
                "body": { "text":text },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": { "id": "change-button", "title": labelOne },
                        },
                        {
                            "type": "reply",
                            "reply": { "id": "cancel-button", "title": labelTwo },
                        },
                    ],
                },
            },
        };
  
        console.log('Prepared message data:', data);
        return data;
    } catch (error) {
        console.error('Error in prepareMessageData:', error);
        throw error;
    }
  }
}
module.exports = metaController;