import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

let AutoIncrement;
try {
  AutoIncrement = mongooseSequence(mongoose);
} catch (err) {
  AutoIncrement = null;
}

const creationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    prompt: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, required: true },
    publish: { type: Boolean, default: false },
    likes: [{ type: String }]
  },
  { timestamps: true }
);

if (AutoIncrement) {
  creationSchema.plugin(AutoIncrement, { inc_field: 'id' });
}

const Creation = mongoose.model('Creation', creationSchema);

export default Creation;