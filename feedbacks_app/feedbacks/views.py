from rest_framework import generics
from .models import Category, Message
from .serializers import CategorySerializer, MessageSerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class MessageCreateView(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
