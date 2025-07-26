import pandas as pd
from sqlalchemy.orm import Session
from .database import engine, SessionLocal
from .models import Base, Product

def load_products():
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()

    df = pd.read_csv("ecommerce_data.csv")
    for _, row in df.iterrows():
        product = Product(
            name=row['name'],
            category=row['category'],
            stock=row['stock'],
            sold=row['sold']
        )
        session.add(product)
    session.commit()
    session.close()