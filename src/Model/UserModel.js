const e = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirstName: {
        type:String,
        required:true,
        maxlength:[20,"FristName should be less than 20 characters"],
        minlenth:[3,"FristName should be at least 3 characters"], 
         set:(v)=>{
            v.trim();
            return v;
         },
    },

    LastName: {
        type:String,
        required:true,
        maxlength:[20,"LastName should be less than 20 characters"],
        minlenth:[3,"LastName should be at least 3 characters"],
         set:(v)=>{
            v.trim();
            return v;
         },
    },
    email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,

        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type:String,
        required:true,
        minlength:[6,"Password should be at least 6 characters"],
            set:(v)=>{
            v.trim();
            return v;
         },
         maxlength:[100,"Password should be less than 100 characters"],

    },
    role: {
        type:String,
        enum:['admin','user','manager','staff','sales','support','customer','guest','editor','contributor','moderator','analyst','developer','designer','tester','operator','consultant','director','executive'],
        default:'user',
    },
    createdAt: {
        type:Date,
        default:Date.now,
    },
    isActive: {
        type:Boolean,
        default:true,
    },
},{versionKey: false,});
const userModel = mongoose.model('Users', userSchema);
module.exports = userModel;
