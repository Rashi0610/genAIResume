import mongoose from "mongoose";

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { _id: false })

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { _id: false })

const skillGapSchema = new mongoose.Schema({
    skill: {           // Fixed: was "skills", AI returns "skill"
        type: String,
        required: true,
    },
    severity: {
        type: String,
        required: true,
        enum: ["high", "medium", "low"]
    }
}, { _id: false })

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,  // Fixed: was String, AI returns a number
        required: true
    },
    focus: {
        type: String,
        required: true
    },
    tasks: [{
        type: String,
        required: true
    }]
}, { _id: false })

const interviewReportSchema = new mongoose.Schema({
    jobdescription: {
        type: String,
        required: [true, "Job Description is Mandatory"]
    },
    resumetext: {
        type: String
    },
    selfdescription: {
        type: String
    },
    title: {
        type: String       
    },
    matchScore: {
        type: Number,       
        min: 0,
        max: 100
    },
    technicalquestions: [technicalQuestionSchema],   
    behavioralquestions: [behavioralQuestionSchema], 
    skillgaps: [skillGapSchema],                     
    preparationplan: [preparationPlanSchema],        
    rawAI: {
        type: mongoose.Schema.Types.Mixed            
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true })

export default mongoose.model("interviewReport", interviewReportSchema)