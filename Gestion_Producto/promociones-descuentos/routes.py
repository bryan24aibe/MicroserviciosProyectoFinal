from fastapi import APIRouter, HTTPException
from models import Notificacion
from config import notificaciones_collection
from bson import ObjectId

router = APIRouter()

@router.post("/notificaciones/", response_model=Notificacion)
async def crear_notificacion(notificacion: Notificacion):
    """Crea una nueva notificación de descuento"""
    nueva_notificacion = notificacion.dict()
    resultado = notificaciones_collection.insert_one(nueva_notificacion)
    return {**nueva_notificacion, "_id": str(resultado.inserted_id)}

@router.get("/notificaciones/")
async def obtener_notificaciones():
    """Obtiene todas las notificaciones enviadas"""
    notificaciones = list(notificaciones_collection.find({}, {"_id": 0}))
    return notificaciones
