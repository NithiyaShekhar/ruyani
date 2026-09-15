from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Product, Order, OrderItem
from schemas import ProductResponse, OrderCreate, OrderItemCreate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database dependency
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "Welcome to Ruyani Naturals API"}


@app.get("/products", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products


@app.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.get(Product, product_id)

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product

@app.patch("/products/{product_id}/stock")
def update_stock(
    product_id: int,
    quantity: int,
    db: Session = Depends(get_db)
):
    product = db.get(Product, product_id)

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if quantity < 0:
        raise HTTPException(
            status_code=400,
            detail="Stock quantity cannot be negative"
        )

    product.stock_quantity = quantity
    product.inStock = quantity > 0

    db.commit()
    db.refresh(product)

    return {
        "message": "Stock updated successfully",
        "product_id": product.id,
        "stock_quantity": product.stock_quantity,
        "inStock": product.inStock
    }
@app.post("/orders")
def create_order(order_data: OrderCreate, db: Session = Depends(get_db)):

    total_amount = 0
    order_items = []

    # 1. Check every product and its stock
    for item in order_data.items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Product {item.product_id} not found"
            )

        if item.quantity <= 0:
            raise HTTPException(
                status_code=400,
                detail="Quantity must be greater than 0"
            )

        if product.stock_quantity < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Only {product.stock_quantity} items available for {product.name}"
            )

        # Calculate total using DATABASE price
        total_amount += product.price * item.quantity

        order_items.append({
            "product": product,
            "quantity": item.quantity
        })

    # 2. Create the order
    new_order = Order(
        customer_name=order_data.customer_name,
        customer_phone=order_data.customer_phone,
        total_amount=total_amount
    )

    db.add(new_order)
    db.flush()

    # 3. Reduce stock
    for item in order_items:

        product = item["product"]
        quantity = item["quantity"]

        product.stock_quantity -= quantity

        # If stock reaches 0 → Out of Stock
        product.inStock = product.stock_quantity > 0

        order_item = OrderItem(
            order_id=new_order.id,
            product_id=product.id,
            product_name=product.name,
            quantity=quantity,
            price=product.price
        )

        db.add(order_item)

    # 4. Save everything
    db.commit()
    db.refresh(new_order)

    return {
        "message": "Order placed successfully",
        "order_id": new_order.id,
        "total_amount": total_amount
    }