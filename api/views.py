from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Import the product data from our dummy data file.
from .products import products

# This view handles fetching all products.
@api_view(['GET'])
def getProducts(request):
    # Return the product data directly from the products.py file.
    return Response(products)

# This view handles fetching a single product by its ID.
@api_view(['GET'])
def getProduct(request, pk):
    # Find the product in our dummy data that matches the requested ID.
    product = None
    for i in products:
        if i['_id'] == pk:
            product = i
            break
    # Return the single product as a JSON response.
    return Response(product)
