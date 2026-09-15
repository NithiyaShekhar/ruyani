from pydantic import BaseModel, ConfigDict
from typing import List

class ProductResponse(BaseModel):
    id: int
    name: str
    img: str
    desc: str
    price: float
    size: str
    category: str
    badge: str | None = None
    inStock: bool
    stock_quantity: int
    features: list[str]
    howToUse: list[str]

    model_config = ConfigDict(from_attributes=True)

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    customer_name: str
    customer_phone: str
    items: List[OrderItemCreate]