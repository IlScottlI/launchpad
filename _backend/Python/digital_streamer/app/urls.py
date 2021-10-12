
from django.urls import path
from app import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('plants/', views.PlantList.as_view()),
    path('plants/<int:pk>/', views.PlantDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('business/', views.BusinessList.as_view()),
    path('business/<int:pk>/', views.BusinessDetail.as_view()),
    path('modules/', views.ModuleList.as_view()),
    path('modules/<int:pk>/', views.ModuleDetail.as_view()),
    path('departments/', views.DepartmentList.as_view()),
    path('departments/<int:pk>/', views.DepartmentDetail.as_view()),
    path('areas/', views.AreaList.as_view()),
    path('areas/<int:pk>/', views.AreaDetail.as_view()),
    path('teams/', views.TeamList.as_view()),
    path('teams/<int:pk>/', views.TeamDetail.as_view()),
    path('roles/', views.RoleList.as_view()),
    path('roles/<int:pk>/', views.RoleDetail.as_view()),
    path('workspaces/', views.WorkspaceList.as_view()),
    path('workspaces/<int:pk>/', views.WorkspaceDetail.as_view()),
    path('pages/', views.PageList.as_view()),
    path('pages/<int:pk>/', views.PageDetail.as_view()),
    path('reports/', views.ReportList.as_view()),
    path('reports/<int:pk>/', views.ReportDetail.as_view()),
    path('streams/', views.StreamList.as_view()),
    path('streams/<int:pk>/', views.StreamDetail.as_view()),
    path('pods/', views.PodList.as_view()),
    path('pods/<int:pk>/', views.PodDetail.as_view()),
    path('links/', views.LinkList.as_view()),
    path('links/<int:pk>/', views.LinkDetail.as_view()),
    path('linkworkspaces/', views.LinkWorkspaceList.as_view()),
    path('linkworkspaces/<int:pk>/', views.LinkWorkspaceDetail.as_view()),
    path('categories/', views.CategoryList.as_view()),
    path('categories/<int:pk>/', views.CategoryDetail.as_view()),
    path('sidebarlinks/', views.SidebarLinksList.as_view()),
    path('sidebarlinks/<int:pk>/', views.SidebarLinksDetail.as_view()),
    path('slides/', views.SlideList.as_view()),
    path('slides/<int:pk>/', views.SlideDetail.as_view()),
    path('tags/', views.TagList.as_view()),
    path('tags/<int:pk>/', views.TagDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)