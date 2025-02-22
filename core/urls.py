"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from cafes.views import *
from posts.views import *
from users.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/sliders/', SlidersList.as_view(), name='slider_lists'),
    path('api/posts/', PostsList.as_view(), name="posts-list-url"),
    path('api/users/create/', UserCreateView.as_view(), name="user-create-url"),
    # auth urls
    path('api/auth/token/', TokenObtainPairView.as_view(), name="token_pair"),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='refresh_url'),
    path('api/auth/update-profile-info/', SetUpdateFirstNameLastNameBioView.as_view(), name="update-profile-url"),
    path('api/auth/profile/', ProfileInformation.as_view(), name="profile-url"),
    path('api/auth/update-avatar/<int:pk>/', UpdateAvatarView.as_view(), name="update-avatar-url"),
    # users
    path('api/users/all-in-area/', GetAllUsers.as_view(), name='get-all-users-area-url'),
    path('api/users/follow/<int:id>/', FollowRequestView.as_view(), name='follow-request-url'),
    path('api/users/unfollow/<int:id>/', unfollowRequestView, name="unfollow-request-url"),
    path('api/users/profile/<str:username>/', ProfileDetails.as_view()),
    # cafe urls
    path('api/cafes/add/', AddCafeView.as_view(), name="add-cafe-url"),
    path('api/cafes/list/', CafeListView.as_view(), name="list-cafes-url"),
    path('api/cafes/detail/<str:slug>/', CafeView.as_view(), name="cafe-detail-url"),
    path('api/cafes/clubs/', GetAllClubsView.as_view(), name='clubs-list-url'),
    path('api/cafes/clubs/<int:pk>/', GetClubInformationView.as_view(), name="club-details-url"),
    path('api/cafes/list/cards/', AllCafeCardListView.as_view(), name='all-cafe-card-url'),
    path('api/cafes/check-admin/', check_admin, name='check-admin'),
    path('api/club/add/member/<int:club_id>/', add_user_to_club),
    path('api/club/is/member/<int:club_id>/', check_club_subscribed),
    path('api/events/create/', CreateEventView.as_view(), name='create-event-url'),
    path('api/events/all/', ListEventView.as_view(), name="list-events-url"),
    path('api/events/details/<int:pk>/', EventDetailView.as_view()),
    path('api/cafes/add/category/<int:cafeid>/', CreateCategoryView.as_view()),
    path('api/cafes/categories/<int:cafeid>/<int:categoryid>/', GetCategoryView.as_view()),
    path('api/cafes/delete/category/<int:cafeid>/<int:category_id>/', DeleteCategoryView.as_view()),
    # admin
    path('api/admin/', adminAPIView),
    path('api/admin/cafes/<int:id>/', AdminGetCafeAPIView.as_view()),
    path('api/admin/add/menu/<int:cafeid>/<int:categoryid>/', AddMenuItem.as_view()),
    path('api/admin/add/club/<int:cafeid>/', AddClubView.as_view()),
    path('api/admin/club/members/<int:cafeid>/', AdminMembersClub.as_view()),
    path('api/admin/cafe/update/banner/<int:id>/', AddCafePicturesView.as_view()),
    path('api/admin/cafe/update/description/<int:id>/', UpdateCafeDescription.as_view()),
    path('api/admin/cafe/update/menu/item/<int:id>/', UpdateItem.as_view()),
    # hooks
    path('hook/users/get-profile/<int:id>/', GetAnyProfileInformation.as_view(), name="get-profile-hook"),
    path('hook/offer-hobby/', offerHobbyHook, name='offer-hobby-hook'),
    path('hook/add-hobby/', addHobbyHook, name='add-hobby-hook'),
    # path('hook/offer-job/', offerJobHook, name='offer-job-hook'),
    # path('hook/add-job/', addJobHook, name='add-job-hook'),
    path('hook/offer-music-genre/', offerMusicGenreHook, name='offer-music-genre-hook'),
    path('hook/add-music-genre/', addMusicGenreHook, name='add-music-genre-hook'),
    path('hook/participant/<int:event_id>/', participantInEventView, name='participant-url'),
    path('hook/offer-cafe/', offerCafeView, name='offer-cafe-url'),
    path('hook/user-clubs/', clubOfferHook),
    path('hook/get-cities/', getCitiesNames),
]


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
