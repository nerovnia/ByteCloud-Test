import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    hours: {
        type: {
          start: Number,
          end: Number
        },
        required: true,
    },
    personName: {
        type: String
    },
    birthDate: {
      type: String
  },
},
{
    autoCreate: true,
    timestamp: false,
})

export const Patient = mongoose.models.Patient || mongoose.model('Patient', personSchema)
export const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', personSchema)
