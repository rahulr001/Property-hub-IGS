from django.db import models
from multiselectfield import MultiSelectField
from user.models import User


class Property(models.Model):
    User_ID = models.ForeignKey(
        User, db_column="User_ID", on_delete=models.DO_NOTHING)
    Property_ID = models.AutoField(primary_key=True, db_column="Property_ID",)
    PropertyTitle = models.CharField(max_length=50, db_column="PropertyTitle",)
    PropertyType = models.CharField(max_length=100, db_column="PropertyType",)
    Property_ListingType = models.CharField(
        max_length=100, db_column="Property_ListingType",)
    Property_Location = models.CharField(
        max_length=100, db_column="Property_Location",)
    Property_Address = models.CharField(
        max_length=200, db_column="Property_Address",)
    Property_OverallSqft = models.PositiveIntegerField(
        db_column="Property_OverallSqft",)
    Property_Blocks = models.CharField(
        max_length=10, db_column="Property_Blocks",)
    Property_Floors = models.PositiveIntegerField(db_column="Property_Floors",)
    Property_Flats = models.PositiveIntegerField(db_column="Property_Flats",)
    Property_1BHK = models.PositiveIntegerField(db_column="Property_1BHK",)
    Property_2BHK = models.PositiveIntegerField(db_column="Property_2BHK",)
    Property_3BHK = models.PositiveIntegerField(db_column="Property_3BHK",)
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
    Property_Amenities = MultiSelectField(
        max_length=120, choices=Amenities_List, db_column="Property_Amenities",)
    Property_ImgURL = models.URLField(
        max_length=5000, db_column="Property_ImgURL",)
    Property_CreatedAt = models.DateTimeField(
        auto_now_add=True, null=True, db_column="Property_CreatedAt",)
    Property_UpdatedAt = models.DateTimeField(
        auto_now=True, null=True, db_column="Property_UpdatedAt",)

    class Meta:
        db_table = 'Property'
        verbose_name_plural = 'Property'
        ordering = ['Property_ID']

    def __str__(self):
        return f"{self.PropertyTitle}"
