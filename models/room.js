import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    number:{
        type: Number,
        required: true,
        unique: true
    },
    category:{
        type: String,
        required: true
    },
    maxPerson:{
        type: Number,
        required: true
    },
    image:[{
        type: String,
    }],
    note:{
        type: String,
        default: ""
    },
    available:{
        type: Boolean,
        default: true
    }

})

export default mongoose.model("rooms", roomSchema);