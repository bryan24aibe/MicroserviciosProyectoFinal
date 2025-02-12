from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

app = FastAPI(
    title="Microservicio de Notificaciones de Descuentos",
    description="Este microservicio envía notificaciones a los usuarios sobre descuentos.",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(router)

@app.get("/")
async def root():
    return {"mensaje": "Microservicio de Notificaciones de Descuentos funcionando 🚀"}
