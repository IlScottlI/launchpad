from django.http import JsonResponse
from app.models import Plant, User, Business, Module, Department,Team, Area, Role, Pod, Stream, Report, Page, Workspace, LinkWorkspace, Link, Category, SidebarLinks, Slide, Tag
import json
from app.serializers import PlantSerializer, UserSerializer, BusinessSerializer,ModuleSerializer,DepartmentSerializer,AreaSerializer,RoleSerializer, WorkspaceSerializer, PageSerializer, ReportSerializer, StreamSerializer, PodSerializer, LinkWorkspaceSerializer, LinkSerializer, CategorySerializer, TeamSerializer, SidebarLinksSerializer, SlideSerializer, TagSerializer
from rest_framework import generics
from url_filter.integrations.drf import DjangoFilterBackend



class PlantList(generics.ListCreateAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['name', 'display_name']
class PlantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer
    
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['id', 'first_name', 'last_name','email', 'plant', 'user_id', 'officeLocation']
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class BusinessList(generics.ListCreateAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
class BusinessDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer

class ModuleList(generics.ListCreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
class ModuleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

class DepartmentList(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
class DepartmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class AreaList(generics.ListCreateAPIView):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
class AreaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

class RoleList(generics.ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
class RoleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class TeamList(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
class TeamDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class WorkspaceList(generics.ListCreateAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
class WorkspaceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer

class PageList(generics.ListCreateAPIView):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    def get_serializer_class(self):
        if(self.request.GET.get('depth')):
            if (3>= int(self.request.GET.get('depth')) >= 0):
                self.serializer_class.Meta.depth = int(
                    self.request.GET.get('depth'))
        return self.serializer_class
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['page_report']
class PageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Page.objects.all()
    serializer_class = PageSerializer

class ReportList(generics.ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    def get_serializer_class(self):
        if(self.request.GET.get('depth')):
            if (3>= int(self.request.GET.get('depth')) >= 0):
                self.serializer_class.Meta.depth = int(
                    self.request.GET.get('depth'))
        return self.serializer_class
class ReportDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

class StreamList(generics.ListCreateAPIView):
    queryset = Stream.objects.all()
    serializer_class = StreamSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['id','plant']
    def get_serializer_class(self):
        if(self.request.GET.get('depth')):
            if (3>= int(self.request.GET.get('depth')) >= 0):
                self.serializer_class.Meta.depth = int(
                    self.request.GET.get('depth'))
        return self.serializer_class
class StreamDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Stream.objects.all()
    serializer_class = StreamSerializer

class PodList(generics.ListCreateAPIView):
    queryset = Pod.objects.all()
    serializer_class = PodSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['id','plant','tag']
    def get_serializer_class(self):
      if(self.request.GET.get('depth')):
          if (3>= int(self.request.GET.get('depth')) >= 0):
              self.serializer_class.Meta.depth = int(
                  self.request.GET.get('depth'))
      return self.serializer_class
class PodDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pod.objects.all()
    serializer_class = PodSerializer

class LinkList(generics.ListCreateAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['id','category','plant', 'tag']
    def get_serializer_class(self):
        if(self.request.GET.get('depth')):
            if (3>= int(self.request.GET.get('depth')) >= 0):
                self.serializer_class.Meta.depth = int(
                    self.request.GET.get('depth'))
        return self.serializer_class
class LinkDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer

class LinkWorkspaceList(generics.ListCreateAPIView):
    queryset = LinkWorkspace.objects.all()
    serializer_class = LinkWorkspaceSerializer
    def get_serializer_class(self):
        if(self.request.GET.get('depth')):
            if (3>= int(self.request.GET.get('depth')) >= 0):
                self.serializer_class.Meta.depth = int(
                    self.request.GET.get('depth'))
        return self.serializer_class
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['id','plant','tag']
class LinkWorkspaceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LinkWorkspace.objects.all()
    serializer_class = LinkWorkspaceSerializer

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['id']
    def get_serializer_class(self):
      if(self.request.GET.get('depth')):
          if (3>= int(self.request.GET.get('depth')) >= 0):
              self.serializer_class.Meta.depth = int(
                  self.request.GET.get('depth'))
      return self.serializer_class

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    def get_serializer_class(self):
      if(self.request.GET.get('depth')):
          if (3>= int(self.request.GET.get('depth')) >= 0):
              self.serializer_class.Meta.depth = int(
                  self.request.GET.get('depth'))
      return self.serializer_class


class SidebarLinksList(generics.ListCreateAPIView):
    queryset = SidebarLinks.objects.all()
    serializer_class = SidebarLinksSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['id','plant','tag']
    def get_serializer_class(self):
      if(self.request.GET.get('depth')):
          if (3>= int(self.request.GET.get('depth')) >= 0):
              self.serializer_class.Meta.depth = int(
                  self.request.GET.get('depth'))
      return self.serializer_class
class SidebarLinksDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SidebarLinks.objects.all()
    serializer_class = SidebarLinksSerializer
    def get_serializer_class(self):
      if(self.request.GET.get('depth')):
          if (3>= int(self.request.GET.get('depth')) >= 0):
              self.serializer_class.Meta.depth = int(
                  self.request.GET.get('depth'))
      return self.serializer_class

class SlideList(generics.ListCreateAPIView):
    queryset = Slide.objects.all()
    serializer_class = SlideSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['id','plant','tag']
    def get_serializer_class(self):
      if(self.request.GET.get('depth')):
          if (3>= int(self.request.GET.get('depth')) >= 0):
              self.serializer_class.Meta.depth = int(
                  self.request.GET.get('depth'))
      return self.serializer_class
class SlideDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Slide.objects.all()
    serializer_class = SlideSerializer
    def get_serializer_class(self):
      if(self.request.GET.get('depth')):
          if (3>= int(self.request.GET.get('depth')) >= 0):
              self.serializer_class.Meta.depth = int(
                  self.request.GET.get('depth'))
      return self.serializer_class

class TagList(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['id','tag']
class TagDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


def updatePageFilters(request,page_id):
    jsonBody = json.loads(request.body)
    Page.objects.filter(id=page_id).update(filters=jsonBody)
    return JsonResponse(page_id, safe=False)