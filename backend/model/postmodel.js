const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types;
const postShema=new mongoose.Schema({
    description:{
        type:String,
        require:true,
    },
    location:{
        type:String,
        require:true,

    },
    like:[
        {
            type:ObjectId,
            ref:'User'

        },
    ],
    comments:[
        {
           
            
            text: { type: String, required: true },

            commentedBy:{type:ObjectId,ref:'User'},
           

        }
    ],
    image:{
        data:Buffer,
        contentType:String,

    },
    author:{
        type: ObjectId,
        ref: 'User',
        require:true,
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
},{ timestamps: true });
const post =mongoose.model('Post',postShema)
module.exports=post