import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  dateOfArrival: { type: Date, required: true },
  isTaken: { type: Boolean, default: false },
});

const Package = mongoose.model('Package', PackageSchema);
export default Package;
