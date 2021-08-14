import Evento from "../models/Eventos";

export const getEventos = async (req = request, res = response) => {
  const eventos = await Evento.find().populate("user", "name lastName email");

  return res.json({
    ok: true,
    eventos,
  });
};

export const crearEventos = async (req = request, res = response) => {
  try {
    const dbEvento = new Evento(req.body);

    dbEvento.user = req.uid;

    const eventoGuardado = await dbEvento.save();

    return res.status(201).json({
      ok: true,
      msg: "crearEventos",
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

export const getEvento = async (req = request, res = response) => {
  const eventoId = req.params.id;

  try {

    const evento = await Evento.findById(eventoId);

    if(!evento) {

      return res.status(404).json({
        ok: true,
        msg: "No existe el evento"
      });

    } else {
      
      return res.json({
        ok: true,
        evento
      });
    }

    
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }

};

export const actualizarEventos = async (req = request, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {

    const evento = await Evento.findById(eventoId);

    if(!evento) {

      return res.status(404).json({
        ok: true,
        msg: "No existe el evento"
      });

    } 
    
    if( evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para editar ese evento"
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true });
    return res.json({
      ok: true,
      evento: eventoActualizado,
    });
    
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }

};


export const eliminarEventos = async (req = request, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {

    const evento = await Evento.findById(eventoId);

    if(!evento) {

      return res.status(404).json({
        ok: true,
        msg: "No existe el evento"
      });

    } 
    
    if( evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para editar ese evento"
      });
    }


    await Evento.findByIdAndDelete( eventoId );
    return res.json({ ok: true });
    
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }

};
