from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Product  
from parser import parse_products
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close


# @app.get("/")
# def root():
#     return{"status":"ok"}

@app.get('/parse')
def parse_and_save(db: Session = Depends(get_db)):
    products = parse_products()
    for item in products:
        db_products = Product(
            title = item["title"],
            price = item["price"],
            link = item["link"]
        )
        db.add(db_products)
    db.commit()
    
    return {
        "status": "saved",
        "count": len(products)
    }
    

@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()