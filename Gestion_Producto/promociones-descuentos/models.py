from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Notificacion(BaseModel):
    usuario_id: str
    mensaje: str
    fecha_envio: Optional[datetime] = datetime.utcnow()
