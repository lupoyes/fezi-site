from django.db import models
    
class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ('frühstück', 'Frühstück'),
        ('getränke', 'Getränke'),
        ('kuchen', 'Kuchen'),
        ('herzhaft', 'Herzhaft'),
        ('specials', 'Specials'),
    ]
    image = models.ImageField(upload_to='menu-item/')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    vegan = models.BooleanField(default=False)
    vegetarisch = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.category})"


class EventInquiry(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    date = models.DateField()
    guests = models.PositiveIntegerField()
    occasion = models.CharField(max_length=100, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feier-Anfrage von {self.name} am {self.date}"
    
class Reservation(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    date = models.DateField()
    time = models.TimeField()
    guests = models.PositiveIntegerField()
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reservierung von {self.name} am {self.date}"

