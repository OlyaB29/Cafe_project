from models import Customer, Meal, MealOrder
from schemas import OrderCreate, OrderSchema, CustomerSchema, MealSchema
from sqlalchemy.orm import Session
from datetime import datetime, timedelta


def create_order(order: OrderCreate, db: Session):
    customer = db.query(Customer).filter(Customer.address == order.customer.address).first()
    if not customer:
        print('ok')
        customer = Customer(name=order.customer.name, phone=order.customer.phone, address=order.customer.address)
        db.add(customer)
        db.commit()
        db.refresh(customer)
    meal = db.query(Meal).filter(Meal.cafe_meal_id == order.meal.cafe_meal_id).first()
    if not meal:
        meal = Meal(cafe_meal_id=order.meal.cafe_meal_id, name=order.meal.name, price=order.meal.price)
        db.add(meal)
        db.commit()
        db.refresh(meal)
    new_order = MealOrder(customer_id=customer.id, meal_id=meal.id, num=order.num)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return {**order.dict(), "id": new_order.id, "date": new_order.date}


def get_today(db: Session):
    orders = db.query(MealOrder).filter(MealOrder.date > datetime.now() - timedelta(days=1)).order_by(
            MealOrder.customer_id).all()
    return orders


def get_all(db: Session):
    return db.query(MealOrder).all()
