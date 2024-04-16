from django.db import models

class UserType(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class User(models.Model):
    phone = models.CharField(max_length=11, blank=True, null=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30, blank=True, null=True)
    user_type = models.ForeignKey(UserType, on_delete=models.CASCADE)
    birthday = models.DateField()
    hashed_password = models.CharField(max_length=60)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class CarBody(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Car(models.Model):
    registration_number = models.CharField(max_length=9)
    mark = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    color = models.CharField(max_length=50)
    body = models.ForeignKey(CarBody, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.mark} {self.model} ({self.registration_number})"

class TripStatus(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Trip(models.Model):
    customer = models.ForeignKey(User, related_name='trips_as_customer', on_delete=models.CASCADE)
    driver = models.ForeignKey(User, related_name='trips_as_driver', on_delete=models.CASCADE)
    point_start = models.CharField(max_length=100)  # Using CharField as Django does not have a native point field by default
    point_final = models.CharField(max_length=100)
    time_create = models.DateTimeField()
    time_start = models.DateTimeField()
    time_final = models.DateTimeField()
    status = models.ForeignKey(TripStatus, on_delete=models.CASCADE)
    cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Trip {self.id} from {self.point_start} to {self.point_final}"

class PaymentStatus(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Payment(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    type_payment = models.ForeignKey(PaymentStatus, on_delete=models.CASCADE)
    status = models.IntegerField()  # Assuming status is an integer field not explained further

    def __str__(self):
        return f"Payment {self.id} for Trip {self.trip.id}"