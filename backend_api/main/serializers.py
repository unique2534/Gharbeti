from dataclasses import fields
from rest_framework import serializers
from rest_framework.fields import empty
from . import models
from .models import Location


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Vendor
        fields=['id','user','address']

    def __init__(self, *args, **kwargs):
        super(VendorSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth=1


class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Vendor
        fields=['id','user','address']

    def __init__(self, *args, **kwargs):
        super(VendorDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth=1


class productListSerializer(serializers.ModelSerializer):

    tag_list = serializers.SerializerMethodField()
    class Meta:
        model=models.Product
        fields=['id','category','vendor','title','slug','tag_list','detail','price','product_ratings','image']

    def get_tag_list(self, obj):
        return obj.tag_list()
    
    def __init__(self, *args, **kwargs):
        super(productListSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth=1

class productImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProductImage
        fields=['id','product', 'image']

class productDetailSerializer(serializers.ModelSerializer):
    product_ratings=serializers.StringRelatedField(many=True, read_only=True)
    product_imgs=productImageSerializer(many=True, read_only=True)
    class Meta:
        many=True
        model=models.Product
        fields= ['id','category','vendor','title','slug','tag_list','detail','price','product_ratings','product_imgs','location_url','image']

    def __init__(self, *args, **kwargs):
        super(productDetailSerializer, self).__init__(*args, **kwargs)
        #self.Meta.depth=1

#Customer
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Customer
        fields=['id','user','mobile']

    def __init__(self, *args, **kwargs):
        super(CustomerSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth=1


class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ['id', 'user', 'mobile']

    def __init__(self, *args, **kwargs):
        super(CustomerDetailSerializer, self).__init__(*args, **kwargs)  

        self.Meta.depth=1


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Order
        fields=['id','customer','order_status']

    #def __init__(self, *args, **kwargs):
        #super(OrderSerializer, self).__init__(*args, **kwargs)
       # self.Meta.depth=1

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.OrderItems
        fields=['id','order','product','qty','price']

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItems
        fields = ['id', 'order', 'product']

    def __init__(self, *args, **kwargs):
        super(OrderDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1



class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomerAddress
        fields = ['id', 'customer', 'address','default_address']

    def __init__(self, *args, **kwargs):
        super(CustomerAddressSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1



class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductRating
        fields = ['id', 'customer', 'product','rating','reviews','add_time']

    def __init__(self, *args, **kwargs):
        super(ProductRatingSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.productCategory
        fields=['id','title','detail']

    def __init__(self, *args, **kwargs):
        super(CategorySerializer, self).__init__(*args, **kwargs)
        self.Meta.depth=1


class CategoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.productCategory
        fields=['id','title','detail']

    def __init__(self, *args, **kwargs):
        super(CategoryDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth=1


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'