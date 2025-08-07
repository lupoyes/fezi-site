
from rest_framework.routers import DefaultRouter
from django.urls import path
from api import views


urlpatterns = [
    path('menu-item/', views.getMenuData),
    path('menu-item/pages/', views.getMenuPages),
    path('reservation/avaiableTimes/', views.getAvaiableReservationTimes),
]


router = DefaultRouter()

router.register(r'reservation', views.ReservationViewSet, basename='reservation')
router.register(r'event-inquery', views.EventInquiryViewSet, basename='event-inquery')

urlpatterns += router.urls

