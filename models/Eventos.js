import { model, Schema } from "mongoose";

const EventoSchema = Schema({
    
    title: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },
    
  });

  EventoSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  
  const Evento = model('Evento', EventoSchema);
  export default Evento;