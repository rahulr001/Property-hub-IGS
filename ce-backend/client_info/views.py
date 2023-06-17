from django.shortcuts import render
from rest_framework.response import Response
from .models import Clients
from .serializers import ClientsSerializer, ClientsSerializerID, DataGridSerializer, ClientsUpdateSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework import status
from user.models import User
# Create your views here.


class ClientsView (APIView):
    serializer_class = ClientsSerializer

    def get(self, request, Client_ID=None, *args, **kwargs):
        try:
            if Client_ID:
                data = Clients.objects.get(Client_ID=Client_ID)
                serializer = ClientsSerializerID(data)
            else:
                data = Clients.objects.all()
                serializer = ClientsSerializerID(data, many=True)
            return Response(serializer.data)
        except Clients.DoesNotExist:
            return Response({"response": "Clients Data not Found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        data = request.data
        mobile_no = request.data.get('Client_Mobile_No')
        user_exists1 = Clients.objects.filter(Client_Mobile_No=mobile_no)
        user_exists2 = User.objects.filter(Mobile_No=mobile_no)
        if user_exists1 or user_exists2:
            result = 'User already exists'
        elif request.data['Client_password1'] != request.data['Client_password2']:
            result = 'Password Does not match'
        else:
            serializer = ClientsSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({"response": "Clients Data added Successfully ", "data": serializer.data}, status=status.HTTP_201_CREATED)
            result = serializer.errors
        return Response({'response': result, },  status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, Client_ID, *args, **kwargs):
        data = request.data
        try:
            ClientsData = Clients.objects.get(Client_ID=Client_ID)
            serializer = ClientsSerializer(
                instance=ClientsData, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({"response": "Clients Data Updated Successfully ", "data": serializer.data}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Clients.DoesNotExist:
            return Response({"response": "Clients Data Not Found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, Client_ID, *args, **kwargs):
        try:
            ClientsData = Clients.objects.get(Client_ID=Client_ID)
            ClientsData.delete()
            return Response({"response": "Clients Data Deleted Successfully "}, status=status.HTTP_204_NO_CONTENT)
        except Clients.DoesNotExist:
            return Response({"response": "Clients Data Not Found"}, status=status.HTTP_404_NOT_FOUND)


class Clientlogin(APIView):
    def post(self, request):
        data = request.data
        print(data)
        try:
            user = Clients.objects.get(
                Client_Mobile_No=data['Mobile_No'], Client_password1=data['password'])
            context = {
                'role': user.Client_Role,
                'user_id': user.Client_ID,

            }
            return Response({'response': 'login successfull', 'context': context},
                            status=status.HTTP_200_OK)
        except:

            return Response({'error': 'requested user does not exists'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, Mobile_No=None, *args, **kwargs):
        try:
            if Mobile_No:
                data = Clients.objects.get(Client_Mobile_No=Mobile_No)
                serializer = ClientsSerializerID(data)
            else:
                data = Clients.objects.all()
                serializer = ClientsSerializerID(data, many=True)
            return Response(serializer.data)
        except Clients.DoesNotExist:
            return Response({"response": "Clients Data not Found"})


class DataGridView(APIView):
    serializer_class = DataGridSerializer

    def get(self, request, Client_ID=None):
        try:
            if Client_ID:
                data = Clients.objects.filter(Client_ID=Client_ID).first()
                serializer = DataGridSerializer(data)
            else:
                data = Clients.objects.all()
                serializer = DataGridSerializer(data, many=True)
            return Response(serializer.data)
        except Clients.DoesNotExist:
            return Response({"response": "Clients Data not Found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = DataGridSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"response": "Clients Data saved Successfully ", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, Client_ID, *args, **kwargs):
        data = request.data
        try:
            ClientsData = Clients.objects.filter(Client_ID=Client_ID).first()
            serializer = DataGridSerializer(instance=ClientsData, data=data)
            if serializer.is_valid():
                serializer.save()
            return Response({"response": "Clients Data Updated Successfully ", "data": serializer.data}, status=status.HTTP_200_OK)
        except Clients.DoesNotExist:
            return Response({"response": "Clients Data Not Found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, Client_ID, *args, **kwargs):
        try:
            ClientsData = Clients.objects.get(Client_ID=Client_ID)
            ClientsData.delete()
            return Response({"response": "Clients Data Deleted Successfully "}, status=status.HTTP_204_NO_CONTENT)
        except Clients.DoesNotExist:
            return Response({"response": "Clients Data Not Found"}, status=status.HTTP_404_NOT_FOUND)
