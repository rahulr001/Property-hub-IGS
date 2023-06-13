from rest_framework import serializers
from . models import Property


class PropertySerializer(serializers.ModelSerializer):
    Property_Amenities = serializers.MultipleChoiceField(
        choices=Property.Amenities_List)

    class Meta:
        model = Property
        exclude = ('Property_ID',)
        # depth = 2


class PropertySerializerID(serializers.ModelSerializer):
    Property_Amenities = serializers.MultipleChoiceField(
        choices=Property.Amenities_List)

    class Meta:
        model = Property
        fields = '__all__'
        depth = 2
