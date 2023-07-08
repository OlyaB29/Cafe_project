import uvicorn
from fastapi import FastAPI
import router
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(router.router, prefix='/order')

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['http://localhost:3000'],
    allow_methods = ["*"],
    allow_headers = ["*"]
)


if __name__ == '__main__':
    uvicorn.run(
        'order_service:app',
        host='localhost',
        port=8081,
        reload=True
    )
