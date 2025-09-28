from django.db import models
from django.contrib.auth.models import User

# This is our Product model. It will store the information for each item in our store.
class Product(models.Model):
    # The name of the product.
    name = models.CharField(max_length=200, null=True, blank=True)
    # The image of the product.
    image = models.CharField(max_length=500, null=True, blank=True)
    # A brief description of the product.
    description = models.TextField(null=True, blank=True)
    # The price of the product. DecimalField is used for precise monetary values.
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    # The quantity of the product in stock.
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    # The unique identifier for each product.
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

# This model tracks a specific order made by a user.
class Order(models.Model):
    # A foreign key linking the order to the user who made it.
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    # A method of payment.
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    # The total price of the order.
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    # A timestamp for when the order was placed.
    createdAt = models.DateTimeField(auto_now_add=True)
    # The unique identifier for each order.
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)

# This model links an order to the specific products it contains.
class OrderItem(models.Model):
    # The product being ordered.
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    # The order to which this item belongs.
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    # The name of the product at the time of purchase.
    name = models.CharField(max_length=200, null=True, blank=True)
    # The quantity of this specific product in the order.
    quantity = models.IntegerField(null=True, blank=True, default=0)
    # The price of the product at the time of purchase.
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    # The unique identifier for each order item.
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)
