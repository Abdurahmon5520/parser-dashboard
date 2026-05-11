from sqlalchemy import Column, Integer, String, Float
from database import Base

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    price = Column(String)
    link = Column(String)
    image = Column(String)
    
