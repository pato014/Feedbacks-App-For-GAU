from django.urls import path
from .views import CategoryListView, MessageCreateView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('messages/', MessageCreateView.as_view(), name='message-create'),
]
