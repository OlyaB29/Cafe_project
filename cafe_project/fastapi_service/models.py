from sqlalchemy import Integer, Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime


class Customer(Base):
    __tablename__ = 'customers'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String, nullable=False)
    address = Column(String, nullable=False)
    customer_orders = relationship("MealOrder", backref='customer')


class Meal(Base):
    __tablename__ = 'meal'

    id = Column(Integer, primary_key=True, index=True)
    cafe_meal_id = Column(Integer, unique=True)
    name = Column(String)
    price = Column(Integer)
    meal_orders = relationship("MealOrder", backref='meal')


class MealOrder(Base):
    __tablename__ = 'meal_order'

    id = Column(Integer, primary_key=True)
    customer_id = Column(Integer, ForeignKey('customers.id'))
    meal_id = Column(Integer, ForeignKey('meal.id'))
    num = Column(Integer, default=1)
    date = Column(DateTime, default=datetime.now)

