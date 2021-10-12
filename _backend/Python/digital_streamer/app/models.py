from django.db import models
from typing import Tuple
from django.db.models.fields import TextField
from django.db.models.fields.json import JSONField
from django.db.models.fields.related import ForeignKey
import django.utils.timezone as tz
from django.utils import timezone
import datetime
import timeago
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
from colorfield.fields import ColorField

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])


class Snippet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField()
    linenos = models.BooleanField(default=False)
    language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)
    style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=100)

    class Meta:
        ordering = ['created']

def now() -> datetime.datetime:
    return datetime.datetime.now()

def formatDateTime(dt_string):
    try:
        if dt_string.strftime("%I")[:1] != '0':
            dt_object1 = dt_string.strftime("%b %d, %I:%M %p")
        else:
            dt_object1 = dt_string.strftime(
                "%b %d, ") + dt_string.strftime("%I")[1:] + dt_string.strftime(":%M %p")
    except:
        dt_object1 = str(dt_string)
        pass
    print(dt_object1)
    now = datetime.datetime.now()
    print('now', timezone.now().isoformat() )
    print('now', timezone.localtime(timezone.now()))

    my_tz = tz.get_default_timezone()
    date1 = tz.make_aware(datetime.datetime.now(), my_tz)
    print(date1.utcoffset())
    return timeago.format(dt_string.strftime("%Y-%m-%d %H:%M:%S"), now)

class Tag(models.Model):
    tag = models.CharField(max_length=255)
    def __str__(self):
        return self.tag

class Plant(models.Model):
    name = models.CharField(max_length=255)
    display_name = models.CharField(max_length=255,blank=True,null=True)
    default_workspace = models.IntegerField(null=True)
    def __str__(self):
        return self.display_name

class Business(models.Model):
    name = models.CharField(max_length=255)
    plant = models.ForeignKey(
        Plant,
        related_name="plant_business",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class Module(models.Model):
    name = models.CharField(max_length=255)
    plant = models.ForeignKey(
        Plant,
        related_name='module_plant',
        on_delete=models.CASCADE
    )
    businesses = models.ForeignKey(
        Business,
        related_name="business_module",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

class Department(models.Model):
    name = models.CharField(max_length=255)
    plant = models.ForeignKey(
        Plant,
        related_name='dept_plant',
        on_delete=models.CASCADE
    )
    module = models.ForeignKey(
        Module,
        related_name="module_department",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class Area(models.Model):
    name = models.CharField(max_length=255)
    plant = models.ForeignKey(
        Plant,
        related_name='area_plant',
        on_delete=models.CASCADE
    )
    department = models.ForeignKey(
        Department,
        related_name="department_area",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class Role(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class User(models.Model):
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.CharField(max_length=512)
    user_id = models.CharField(max_length=255, null=True, blank=True)
    default_workspace = models.IntegerField( null=True, blank=True)
    workspace_style = models.CharField(max_length=255, null=True, blank=True)
    officeLocation = models.CharField(max_length=255, null=True, blank=True)
    role = models.ManyToManyField(
        Role,
        related_name="user_role",
        blank=True
    )
    team = models.ForeignKey(
        Team,
        related_name="user_team",
        on_delete=models.CASCADE,
        blank=True,
    )
    plant = models.ForeignKey(
        Plant,
        related_name='user_plant',
        on_delete=models.CASCADE
    )
    business = models.ManyToManyField(
        Business,
        related_name="user_business",
        blank=True
    )
    module = models.ManyToManyField(
        Module,
        related_name="user_module",
        blank=True
    )
    department = models.ManyToManyField(
        Department,
        related_name="user_department",
        blank=True
    )
    area = models.ManyToManyField(
        Area,
        related_name="user_area",
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Workspace(models.Model):
    name = models.CharField(max_length=255)
    workspace_id = models.CharField(max_length=255)
    created_by = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Page(models.Model):
    name = models.CharField(max_length=255)
    displayName = models.CharField(max_length=255)
    filters = models.JSONField(blank=True,null=True)
    created_by = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Report(models.Model):
    plant = models.ForeignKey(
        Plant,
        related_name='report_plant',
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    tab = models.CharField(max_length=255, null=True, blank=True)
    workspace = models.ForeignKey(
        Workspace,
        related_name='report_workspace',
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    report_id = models.CharField(max_length=255, null=True, blank=True)
    filter_json = models.JSONField(null=True,blank=True)
    pages = models.ManyToManyField(
        Page,
        related_name="page_report",
        blank=True
    )
    page_tabs = models.BooleanField(default=False)
    filter_pane = models.BooleanField(default=False)
    owner = models.ManyToManyField(
        User,
        related_name="owner_report",
        blank=True
    )
    business = models.ManyToManyField(
        Business,
        related_name="business_report",
        blank=True
    )
    module = models.ManyToManyField(
        Module,
        related_name="module_report",
        blank=True
    )
    department = models.ManyToManyField(
        Department,
        related_name="department_report",
        blank=True
    )
    area = models.ManyToManyField(
        Area,
        related_name="area_report",
        blank=True
    )
    tag = models.ManyToManyField(
        Tag,
        related_name="tag_report",
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name 

class Slide(models.Model):
    plant = models.ForeignKey(
        Plant,
        related_name='slide_plant',
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    duration = models.DurationField(null=True, blank=True)
    report = models.ForeignKey(
        Report,
        related_name="report_slide",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    owner = models.ManyToManyField(
        User,
        related_name="owner_slide",
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name 

class Stream(models.Model):
    plant = models.ForeignKey(
        Plant,
        related_name='stream_plant',
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    business = models.ManyToManyField(
        Business,
        related_name="business_stream",
        blank=True
    )
    module = models.ManyToManyField(
        Module,
        related_name="module_stream",
        blank=True
    )
    department = models.ManyToManyField(
        Department,
        related_name="department_stream",
        blank=True
    )
    area = models.ManyToManyField(
        Area,
        related_name="area_stream",
        blank=True
    )
    owner = models.ManyToManyField(
        User,
        related_name="owner_stream",
        blank=True
    )
    slide = models.ManyToManyField(
        Slide,
        related_name="slide_stream",
        blank=True
    )
    show_header = models.BooleanField(
        default=False
    )
    header_color = ColorField(default='#0C00A4',blank=True)
    tag = models.ManyToManyField(
        Tag,
        related_name="tag_stream",
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name 


class Pod(models.Model):
    plant = models.ForeignKey(
        Plant,
        related_name='pod_plant',
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    pod_id = models.CharField(max_length=255)
    room_num = models.CharField(max_length=255, null=True, blank=True)
    business = models.ManyToManyField(
        Business,
        related_name="business_pod",
        blank=True
    )
    module = models.ManyToManyField(
        Module,
        related_name="module_pod",
        blank=True
    )
    department = models.ManyToManyField(
        Department,
        related_name="department_pod",
        blank=True
    )
    area = models.ManyToManyField(
        Area,
        related_name="area_pod",
        blank=True
    )
    stream = models.ForeignKey(
        Stream,
        related_name="stream_pod",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    tag = models.ManyToManyField(
        Tag,
        related_name="tag_pod",
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name 

class Category(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name 

class Link(models.Model):
    plant = models.ForeignKey(
        Plant,
        related_name='plant_link',
        on_delete=models.CASCADE,
        blank=True,
    )
    name = models.CharField(max_length=255)
    category = models.ManyToManyField(
        Category,
        related_name="link_category",
        blank=True
    )
    tag = models.ManyToManyField(
        Tag,
        related_name="tag_link",
        blank=True
    )
    description = models.TextField(null=True,blank=True)
    color = ColorField(default='#FFFFFF')
    background = ColorField(default='#989898')
    miniName = models.CharField(max_length=3)
    path = models.URLField(max_length=515)
    target = models.CharField(max_length=10,default='_blank')

    def __str__(self):
        try:
            return self.name + " (" + self.plant.display_name + ")"
        except:
            return self.name
            
class LinkWorkspace(models.Model):
    plant = models.ForeignKey(
        Plant,
        related_name='plant_link_workspace',
        on_delete=models.CASCADE,
        blank=True,
    )
    name = models.CharField(max_length=255)
    style = models.CharField(max_length=255, null=True, blank=True)
    link = models.ManyToManyField(
        Link,
        related_name="link_link_workspace",
        blank=True
    )
    business = models.ManyToManyField(
        Business,
        related_name="business_link_workspace",
        blank=True
    )
    module = models.ManyToManyField(
        Module,
        related_name="module_link_workspace",
        blank=True
    )
    department = models.ManyToManyField(
        Department,
        related_name="department_link_workspace",
        blank=True
    )
    area = models.ManyToManyField(
        Area,
        related_name="area_link_workspace",
        blank=True
    )
    tag = models.ManyToManyField(
        Tag,
        related_name="tag_link_workspace",
        blank=True
    )

    def __str__(self):
        try:
            return self.name + "  (" + self.plant.display_name + ")"
        except:
            return self.name

class SidebarLinks(models.Model):
    plant = models.ForeignKey(
        Plant,
        related_name='plant_sidebarlinks',
        on_delete=models.CASCADE,
        blank=True,
    )
    name = models.CharField(max_length=255)
    link = models.ManyToManyField(
        Link,
        related_name="link_sidebarlinks",
        blank=True
    )
    business = models.ManyToManyField(
        Business,
        related_name="business_sidebarlinks",
        blank=True
    )
    module = models.ManyToManyField(
        Module,
        related_name="module_sidebarlinks",
        blank=True
    )
    department = models.ManyToManyField(
        Department,
        related_name="department_sidebarlinks",
        blank=True
    )
    area = models.ManyToManyField(
        Area,
        related_name="area_sidebarlinks",
        blank=True
    )
    tag = models.ManyToManyField(
        Tag,
        related_name="tag_sidebarlinks",
        blank=True
    )

    def __str__(self):
        try:
            return self.name + "  (" + self.plant.display_name + ")"
        except:
            return self.name