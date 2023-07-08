from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CustomerSchema(BaseModel):
    name: Optional[str]
    phone: str
    address: str

    class Config:
        orm_mode = True


class MealSchema(BaseModel):
    cafe_meal_id: int
    name: str
    price: int

    class Config:
        orm_mode = True


class OrderSchema(BaseModel):
    id: int
    customer_id: int
    meal_id: int
    num: int
    date: datetime

    class Config:
        orm_mode = True


class OrderDetail(BaseModel):
    id: int
    customer: CustomerSchema
    meal: MealSchema
    num: int
    date: datetime

    class Config:
        orm_mode = True


class OrderCreate(BaseModel):
    customer: CustomerSchema
    meal: MealSchema
    num: Optional[int]
