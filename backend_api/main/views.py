from rest_framework import generics, permissions, pagination, viewsets, status
from . import serializers
from . import models

from django.db import IntegrityError
from .models import Location
from .serializers import LocationSerializer
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse 
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorDetailSerializer

class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorSerializer

class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.productListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        category_id = self.request.GET.get('category')
        if category_id:
            try:
                category = models.productCategory.objects.get(id=category_id)
                qs = qs.filter(category=category, deleted=False)
            except models.productCategory.DoesNotExist:
                qs = models.Product.objects.none()
        else:
            qs = qs.filter(deleted=False)
        return qs
    

class TagProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.productListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        tag=self.kwargs['tag']
        qs=qs.filter(tags__icontains=tag)
        return qs
    

class RelatedProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.productListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        product_id=self.kwargs['pk']
        product=models.Product.objects.get(id=product_id)
        qs=qs.filter(category=product.category).exclude(id=product_id)
        return qs


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.productDetailSerializer

class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerDetailSerializer

@csrf_exempt
def customer_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)
    
    if user:
        customer=models.Customer.objects.get(user=user)
        msg = {
            'bool': True,
            'user': user.username,
            'id': customer.id,
        }
    else:
        msg = {
            'bool': False,
            'msg': 'Invalid Username/Password!!'
        }
    return JsonResponse(msg)

@csrf_exempt
def customer_register(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    mobile = request.POST.get('mobile')
    username = request.POST.get('username')
    password = request.POST.get('password')

    try:
        # Check if the username already exists
        user_with_username = User.objects.get(username=username)
        msg = {
            'bool': False,
            'msg': 'Username already exists!'
        }
    except User.DoesNotExist:
        try:
            # Check if the mobile number already exists
            user_with_mobile = models.Customer.objects.get(mobile=mobile)
            msg = {
                'bool': False,
                'msg': 'Mobile already exists!'
            }
        except models.Customer.DoesNotExist:
            # Create a new user and customer if both username and mobile are unique
            user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                username=username,
                password=password,
            )
            if user:
                # Create the customer
                customer = models.Customer.objects.create(
                    user=user,
                    mobile=mobile
                )
                msg = {
                    'bool': True,
                    'user': user.id,
                    'customer': customer.id,
                    'msg': 'Thank you for registration. You can now log in.'
                }
            else:
                msg = {
                    'bool': False,
                    'msg': 'Oops, something went wrong!'
                }

    return JsonResponse(msg)




class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer

class OrderDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.OrderDetailSerializer
    queryset = models.OrderItems.objects.all()

    def get_queryset(self):
        order_id = self.kwargs['pk']
        return models.OrderItems.objects.filter(order_id=order_id)



class OrderItemList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderItemSerializer
    
    def get_queryset(self):
        order_id = self.kwargs['pk']
        try:
            order = models.Order.objects.get(id=order_id)
            order_items = models.OrderItems.objects.filter(order=order)
            return order_items
        except models.Order.DoesNotExist:
            return []

class CustomerAddressViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CustomerAddressSerializer
    queryset = models.CustomerAddress.objects.all()

class ProductRatingViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProductRatingSerializer
    queryset = models.ProductRating.objects.all()

class CategoryList(generics.ListCreateAPIView):
    queryset = models.productCategory.objects.all()
    serializer_class = serializers.CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.productCategory.objects.all()
    serializer_class = serializers.CategoryDetailSerializer
@csrf_exempt
def update_order_status(request, order_id):
    if request.method == 'POST':
        updateRes = models.Order.objects.filter(id=order_id).update(order_status=True)
        msg={
            'bool': False,
        }
        if updateRes:
            msg={
                'bool':True,
            }

    return JsonResponse(msg)



class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer