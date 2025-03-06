import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

applicationSchema.index({ userId: 1, isStatus: 1 });

const ApplicationModel = mongoose.model("applications", applicationSchema);

export default ApplicationModel;
