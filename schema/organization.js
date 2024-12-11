const mongoose = require("mongoose");

const organization_schema = mongoose.Schema({
    organization_name: {
        type: String,
    },
    logo: {
        type: String,
        default:"https://mindvision.sgp1.digitaloceanspaces.com/assets/user/default_user_image.png"
    },
    workspace: {
        type: String,
    },
    customer_labels:[{
        type:String
    }],
    billing_details: 
        {
            biller_name: {
                type: String,
            },
           
            email: {
                type: String,
            },
            phone_number: {
                type: String,
            },
            address_line_one: {
                type: String,
            },
            address_line_two: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
              pin_code: {
                type: String,
            },
            country: {
                type: String,
            },
        },
    
    tags: { type: String, },
});

module.exports = mongoose.model("Organization", organization_schema);
