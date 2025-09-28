from django.urls import path
from . import views

urlpatterns = [
    # Endpoint for fetching all products.
    path('products/', views.getProducts, name="products"),
    # Endpoint for fetching a single product by ID. The <str:pk> captures the product's ID from the URL.
    path('products/<str:pk>/', views.getProduct, name="product"),
]
