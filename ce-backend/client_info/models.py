from django.db import models
from multiselectfield import MultiSelectField
from property_info.models import Property
from user.models import User


class Clients(models.Model):
    # User = models.OneToOneField(User,on_delete=models.CASCADE)
    Client_ID = models.AutoField(primary_key=True, db_column="Client_ID")
    Client_PropertyID = models.ForeignKey(
        Property, on_delete=models.DO_NOTHING, db_column="Client_PropertyID")
    Client_Block = models.CharField(
        max_length=10, null=True, db_column="Client_Block")
    Client_FlatNo = models.CharField(
        max_length=10, null=True, db_column="Client_FlatNo")
    Client_PropertyTitle = models.CharField(
        max_length=30, null=True, db_column="Client_PropertyTitle")
    Client_PropertyType = models.CharField(
        max_length=30, null=True, db_column="Client_PropertyType")
    Client_ListingType = models.CharField(
        max_length=30, null=True, db_column="Client_ListingType")
    Client_ListingPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, db_column="Client_ListingPrice")
    Client_BHK = models.CharField(
        max_length=10, null=True, db_column="Client_BHK")
    Client_Status = models.CharField(
        max_length=10, null=True, db_column="Client_Status")
    Client_ParkingLot = models.CharField(
        max_length=30, null=True, db_column="Client_ParkingLot")
    Client_ConstructionSqft = models.PositiveIntegerField(
        null=True, db_column="Client_ConstructionSqft")
    Client_LandSqft = models.PositiveIntegerField(
        null=True, db_column="Client_LandSqft")
    Client_ShortDesc = models.TextField(
        max_length=240, null=True, db_column="Client_ShortDesc")
    Client_LongDesc = models.TextField(
        max_length=4000, null=True, db_column="Client_LongDesc")
    Amenities_List = [
        ('garden', 'Garden'),
        ('security_cameras', 'Security Cameras'),
        ('laundry', 'Laundry'),
        ('internet', 'Internet'),
        ('pool', 'Pool'),
        ('video_surveillance', 'Video Surveillance'),
        ('jacuzzi', 'Jacuzzi'),
        ('elevator', 'Elevator'),
        ('vigilance', 'Vigilance'),
        ('dish', 'Dish'),
        ('solar_panel', 'Solar Panel'),
        ('garage', 'Garage'),
        ('parking', 'Parking')
    ]
    Client_PropertyAmenities = MultiSelectField(
        max_length=120, choices=Amenities_List, null=True, db_column="Client_PropertyAmenities")
    # Client_ImgURL = models.URLField(max_length=5000,null=True)
    Client_CreatedAt = models.DateTimeField(
        auto_now_add=True, null=True, db_column="Client_CreatedAt")
    Client_UpdatedAt = models.DateTimeField(
        auto_now=True, null=True, db_column="Client_UpdatedAt")

    class Meta:
        db_table = 'Clients'
        verbose_name_plural = 'Clients'
        ordering = ['Client_ID']

    def __str__(self):
        return f"{self.Client_FullName}"
