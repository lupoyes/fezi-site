
from rest_framework import viewsets, status
from api.models import Reservation, MenuItem, EventInquiry
from api.serializers import ReservationSerializer, MenuItemSerializer, EventInquirySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q

MENU_ITEMS_PER_PAGE = 10

from django.core.paginator import Paginator

@api_view(['GET'])
def getAvaiableReservationTimes(request):
    return Response({'time':"d"})

@api_view(['GET'])
def getMenuData(request):
    query = request.GET.get('q', '')
    page = int(request.GET.get('page', 1))
    isVegeterian = request.GET.get('vegetarisch', '')
    isVegan = request.GET.get('vegan', '')

    items = MenuItem.objects.filter(
        Q(name__icontains=query)| Q(description__icontains=query)
        )
    
    if isVegeterian:
        items = items.filter(vegetarisch=True)
    if isVegan:
        items = items.filter(vegan=True)
    items = items[(page-1)*MENU_ITEMS_PER_PAGE:page*MENU_ITEMS_PER_PAGE]

    serializer = MenuItemSerializer(items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def getMenuPages(request):
    query = request.GET.get('q', '')
    isVegeterian = request.GET.get('vegetarisch', '')
    isVegan = request.GET.get('vegan', '')
    items = MenuItem.objects.filter(name__icontains=query)
    if isVegeterian:
        items = items.filter(vegetarisch=True)
    if isVegan:
        items = items.filter(vegan=True)
    pages = int(items.count() / MENU_ITEMS_PER_PAGE) + 1 
    return Response(pages, status=status.HTTP_200_OK)

    #paginator = Paginator(items, MENU_ITEMS_PER_PAGE)
    #page_obj = paginator.get_page(page)

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class EventInquiryViewSet(viewsets.ModelViewSet):
    queryset = EventInquiry.objects.all()
    serializer_class = EventInquirySerializer
