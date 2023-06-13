from rest_framework import serializers
from .models import Clients

# Create your serializers here:


class ClientsSerializerID(serializers.ModelSerializer):

    class Meta:
        model = Clients
        fields = '__all__'
        depth = 2


class ClientsUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Clients
        fields = '__all__'


class ClientsSerializer(serializers.ModelSerializer):
    Client_PropertyAmenities = serializers.MultipleChoiceField(
        choices=Clients.Amenities_List)

    class Meta:
        model = Clients
        exclude = ("Client_ID",)
        # depth = 2


class DataGridSerializer(serializers.ModelSerializer):

    class Meta:
        model = Clients
        fields = '__all__'
        depth = 2
