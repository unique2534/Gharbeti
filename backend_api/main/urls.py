from django.urls import path
from . import views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from .views import LocationViewSet

router=routers.DefaultRouter()
router.register('address',views.CustomerAddressViewSet)
router.register('productrating',views.ProductRatingViewSet)
router.register(r'locations', LocationViewSet)

urlpatterns = [
    #vendors
    path('vendors/', views.VendorList.as_view(), name='vendor-list'),
    path('vendors/<int:pk>/', views.VendorDetail.as_view(), name='vendor-details'),
    #products
    path('products/', views.ProductList.as_view(), name='product-list'),
    path('products/<str:tag>', views.TagProductList.as_view(), name='product-list'),
    path('product/<int:pk>/', views.ProductDetail.as_view(), name='product-details'),
    path('related-products/<int:pk>/', views.RelatedProductList.as_view(), name='product-details'),
    #product categories
    path('categories/', views.CategoryList.as_view(), name='category-list'),
    path('category/<int:pk>/', views.CategoryDetail.as_view(), name='category-details'),

    #customers
    path('customers/', views.CustomerList.as_view(), name='customer-list'),
    path('customer/<int:pk>/', views.CustomerDetail.as_view(), name='customer-details'),
    path('customer/login/', views.customer_login,name='customer_login'),
    path('customer/register/', views.customer_register,name='customer_register'),

    #orders
    path('orders/', views.OrderList.as_view(), name='order-list'),
    path('order/<int:pk>/', views.OrderDetail.as_view(), name='order-detail'),
    path('orderitems/', views.OrderItemList.as_view(), name='orderitem-list'),
    path('update-order-status/<int:order_id>/', views.update_order_status, name='update-order-status'),
]

urlpatterns+=router.urls

