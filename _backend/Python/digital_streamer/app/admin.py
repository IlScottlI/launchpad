from django.contrib import admin
from app.models import Plant, User, Business, Module, Department, Area, Role, Pod, Stream, Report, Page, Workspace, LinkWorkspace, Link, Category, Team, SidebarLinks, Slide, Tag
admin.site.site_header = 'LaunchPad Administration'
admin.site.site_title = 'LaunchPad Administration'

admin.site.register([
    Plant, 
    User,
    Business, 
    Module, 
    Department, 
    Area, 
    Role, 
    Pod, 
    Stream, 
    Report,
    Workspace,
    Page,
    LinkWorkspace,
    Link,
    Category,
    Team,
    SidebarLinks,
    Slide,
    Tag,
])
