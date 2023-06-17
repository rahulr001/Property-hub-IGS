from django.urls import path
from .views import ClientsView, DataGridView, Clientlogin

urlpatterns = [
    path("", ClientsView.as_view()),
    path("<int:Client_ID>/update", ClientsView.as_view()),
    path("<int:Client_ID>/delete", ClientsView.as_view()),
    path("client_login/", Clientlogin.as_view()),
    path("client_login/<int:Mobile_No>", Clientlogin.as_view()),
    path("datagrid/", DataGridView.as_view()),
    path("datagrid/<int:Client_ID>/update", DataGridView.as_view()),
    path("datagrid/<int:Client_ID>/delete", DataGridView.as_view()),
]
