import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    patient: {
        type: Number,
        required: true,
    },
    doctor: {
        type: Number,
        required: true,
    },
    hour: {
        type: Number,
        required: false,
    },
},
{
  autoCreate: true,
  timestamp: false
})

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema)
