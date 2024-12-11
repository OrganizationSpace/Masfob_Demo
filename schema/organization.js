const mongoose = require("mongoose");

const organization_schema = mongoose.Schema({
    organization_name: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: [3, " name should be at least 3 characters long"],
        maxlength: [50, " name should not exceed 50 characters"],
        match: [/^[a-zA-Z0-9\s_]+$/,"only use alphaneumeric characters"] 
    },
    logo: {
        type: String,
        default:"https://mindvision.sgp1.digitaloceanspaces.com/assets/user/default_user_image.png",
        match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,"use your logo"] 

    },
    workspace: {
        type: String,
        trim: true,
        minlength: [3, "Workspace name should be at least 3 characters long"],
        maxlength: [50, "Workspace name should not exceed 50 characters"],
        match: [/^[a-zA-Z0-9\s]+$/,"only use alphaneumeric characters"]
    },
    customer_labels:[{
        type:String,
        trim: true,
                // minlength: [3, "label should be at least 3 characters long"],
                // maxlength: [25, " label should not exceed 25 characters"],
                match: [/^[a-zA-Z0-9\s_]+$/,"only use minimum 3 letters "]
    }],
    whatsapp_number:{
        type:String
    },
    billing_details: 
        {
            biller_name: {
                type: String,
                trim: true,
                lowercase: true,
                minlength: [3, " name should be at least 3 characters long"],
                maxlength: [50, " name should not exceed 50 characters"],
                match: [/^[a-zA-Z0-9\s_]+$/,"only use alphaneumeric characters"] 
            },
           
            email: {
                type: String,
                trim: true,
                lowercase: true,
                match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"only use alphaneumeric characters"]  
            },
            country_code: {
                type: String,
                trim: true,
                minlength: [1, "Country code should be at least 1 character long"],
                maxlength: [10, "Country code should not exceed 10 characters"],
            },//new
            gst_in: {
                type: String,
                match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST number"],
                //required: true
              },
            phone_number: {
                type: String,
                match: [/^\d{10}$/,"invalid phone_number, must be 10 digits"]
            },
            address_line_one: {
                type: String,
                minlength: [3, " name should be at least 3 characters long"],
                maxlength: [50, " name should not exceed 50 characters"],
                match: [/^[a-zA-Z0-9\s_,/&().-]+$/,"only use alphaneumeric characters"] 
            },
            address_line_two: {
                type: String,
                minlength: [3, " name should be at least 3 characters long"],
                maxlength: [50, " name should not exceed 50 characters"],
                match: [/^[a-zA-Z0-9\s_,/&().-]+$/,"only use alphaneumeric characters"] 
            },
            city: {
                type: String,
                minlength: [3, " name should be at least 3 characters long"],
                maxlength: [20, " name should not exceed 50 characters"],
                match: [/^[a-zA-Z0-9\s]+$/,"only use alphaneumeric characters"] 
            },
            state: {
                type: String,
                minlength: [3, " name should be at least 3 characters long"],
                maxlength: [50, " name should not exceed 50 characters"],
                match: [/^[a-zA-Z\s]+$/,"only use alphaneumeric characters"] 
            },
              pin_code: {
                type: String,
                match: /\d{5,11}/
            },
            country: {
                type: String,
                minlength: [3, " name should be at least 3 characters long"],
                maxlength: [50, " name should not exceed 50 characters"],
                match: [/^[a-zA-Z\s]+$/,"only use alphaneumeric characters"] 
            },
        },
    
    tags: { type: String, },
});

module.exports = mongoose.model("Organization_", organization_schema);
