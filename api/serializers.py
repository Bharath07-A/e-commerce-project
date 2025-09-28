from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem

# This serializer will convert our Product model into a JSON format.
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # '__all__' means we will include all fields from the Product model.
        fields = '__all__'

# This serializer is for user authentication.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # We only need the ID and username for now.
        fields = ['id', 'username']

# This serializer is for the OrderItem model.
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

# This serializer is for the main Order model.
class OrderSerializer(serializers.ModelSerializer):
    # We will nest the OrderItemSerializer to include order items within the order data.
    orderItems = serializers.SerializerMethodField(read_only=True)
    # We will also nest the UserSerializer to include user details.
    user = UserSerializer(read_only=True) # Corrected the typo here

    class Meta:
        model = Order
        fields = '__all__'

    # This method is used to get all order items associated with a specific order.
    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
