import mongoose from "mongoose";

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:string,
        requiered:true
    },
    intention:{
        type:string,
        requiered:true
    },
    answer:{
        type:string,
        requiered:true
    }
},
{
    _id:false
})

const BehavioralQuestionSchema = new mongoose.Schema({
       question:{
        type:string,
        requiered:true
    },
    intention:{
        type:string,
        requiered:true
    },
    answer:{
        type:string,
        requiered:true
    }
},
{
    _id:false
}    
)

const skillGapsSchema = new mongoose.Schema({
    skills:{
        type:String,
        requiered:true,
    },
    severity:{
        type:String,
        requiered:true,
        enum:[high,medium,low]
    },
  

},{_id:false})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:String,
        requiered:true

    },
    focus:{
        type:String,
        requiered:true
    },
    tasks:[{
        type:string,
        requiered:true
    }]
    
},{_id:false})

const InterviweReportSchema = new mongoose.Schema({

    jobdescription:{
        type:String,
        requiered:[true,"Job Description is Mandatory"]   
    },
    resumetext:{
        type:String
    },
    selfdescription:{
        typr:String
    },
    Overallscore:{
        type:Number,
        min:0,
        max:100
    },
    technicalquestions:[technicalQuestionSchema],
    behavioralquestions:[BehavioralQuestionSchema],
    skillgaps:[skillGapsSchema],
    preprationplan:[preparationPlanSchema]
},{
    timestamps:true
})

export default mongoose.model("interviewReport",InterviweReportSchema)