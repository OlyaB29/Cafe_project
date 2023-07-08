from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import OrderCreate, OrderDetail, OrderSchema
from typing import List
import db_service

router = APIRouter()


@router.post('/create', response_model=OrderDetail)
async def create(order: OrderCreate, db: Session = Depends(get_db)):
    return db_service.create_order(order, db)


@router.get('/today', response_model=List[OrderDetail])
async def get_today_orders(db: Session = Depends(get_db)):
    return db_service.get_today(db)


@router.get('/', response_model=List[OrderSchema])
async def get_all_orders(db: Session = Depends(get_db)):
    return db_service.get_all(db)
