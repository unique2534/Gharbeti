from django.db import models
from django.contrib.auth.models import User

# Vendor Models
class Vendor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.TextField(null=True)

    def __str__(self):
        return self.user.username

# Product category
class productCategory(models.Model):
    title = models.CharField(max_length=200)
    detail = models.TextField(null=True)

    def __str__(self):
        return self.title
    
# Product
class Product(models.Model):
    category = models.ForeignKey(productCategory, on_delete=models.SET_NULL, null=True, related_name='category_product')
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    slug = models.CharField(max_length=300, unique=True, null=True)
    detail = models.TextField(null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    tags = models.TextField(null=True)
    image=models.ImageField(upload_to='product_imgs/', null=True)
    location_url=models.URLField(null=True,blank=True)
    deleted = models.BooleanField(default=False)
    def __str__(self):
        return self.title
    
    def tag_list(self):
        if self.tags:
            tagList = self.tags.split(',')
            return tagList
        return []

# Customer
class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mobile = models.PositiveBigIntegerField(unique=True)

    def __str__(self):
        return self.user.username

# Order model
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE,related_name='customer_orders')
    order_time = models.DateTimeField(auto_now_add=True)
    order_status=models.BooleanField(default=False)

    def __str__(self):
        return f"Order #{self.order_time}"

# Order Items Model
class OrderItems(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty=models.IntegerField(default=1)
    price=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    def __str__(self):
        return self.product.title

# Customer Address Model
class CustomerAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer_addresses')
    address = models.TextField()
    default_address = models.BooleanField(default=False)

    def __str__(self):
        return self.address

# Product Rating and Reviews
class ProductRating(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='rating_customers')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_ratings')
    rating = models.IntegerField()
    reviews = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.rating} - {self.reviews}'

# Product Images Model
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_imgs')
    image = models.ImageField(upload_to='product_imgs/', null=True)

    def __str__(self):
        return self.image.url


class Location(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.name