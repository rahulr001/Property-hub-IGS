from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager
 


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractUser):
    first_name = None
    last_name = None
    username = None
    is_superuser = None
    is_staff = None
    User_ID = models.AutoField(primary_key=True, db_column="User_ID")
    Full_Name = models.CharField(
        max_length=25, blank=False, null=False, db_column="Full_Name")
    Mobile_No = models.BigIntegerField(
        unique=True, blank=False, null=False, db_column="Mobile_No")
    GST_No = models.CharField(
        max_length=20, blank=True, null=True, db_column="GST_No")
    Role = models.CharField(max_length=30, blank=False,
                            null=False, db_column="Role")
    City = models.CharField(max_length=30, blank=False,
                            null=False, db_column="City")
    Address = models.CharField(
        max_length=100, blank=False, null=False, db_column="Address")
    Created_By = models.CharField(
        max_length=30, blank=False, null=False, db_column="Created_By")
    Status = models.CharField(max_length=10, null=True, db_column="Status")
    Updated_BY = models.CharField(
        max_length=30, blank=False, null=False, db_column="Updated_BY")
    Created_At = models.DateTimeField(
        auto_now_add=True, db_column="Created_At")
    Updated_At = models.DateTimeField(auto_now=True, db_column="Updated_At")

    USERNAME_FIELD = "Mobile_No"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    @property
    def id(self):
        return self.User_ID

    class Meta:
        db_table = 'User'

    def __str__(self) -> str:
        return str(self.Mobile_No)

 