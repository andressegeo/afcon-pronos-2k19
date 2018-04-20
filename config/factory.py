# coding: utf-8
"""
Contains the factory instance.
"""

from google.appengine.api import taskqueue
from .config import CONFIG
from src.service.gs import (
    ClientBuilder,
    DriveIO,
    AdminIO
)
from src.task import (
    ProcessUserTask
)
from src.api import (
    TaskApi, MainApi
)
from src.factory.factory import Factory, Dependency

FACTORY_CONFIG = {
    u"service": {
        u"gs": {
            ClientBuilder: {
                u"service_account_json": CONFIG[u"google_auth"][u"service_account"]
            },
            DriveIO: {
                u"drive": Dependency(u"service.gs.ClientBuilder", u"build", kwargs={
                    u"api": u"drive",
                    u"version": u"v3",
                    u"scopes": CONFIG[u"google_auth"][u"scopes"],
                    u"delegated_account": CONFIG[u"google_auth"][u"delegated_account"]
                }),
                u"client_builder": Dependency(u"service.gs.ClientBuilder"),
                u"scopes": CONFIG[u"google_auth"][u"scopes"]
            },
            AdminIO: {
                u"admin": Dependency(u"service.gs.ClientBuilder", u"build", kwargs={
                    u"api": u"admin",
                    u"version": u"directory_v1",
                    u"scopes": CONFIG[u"google_auth"][u"scopes"],
                    u"delegated_account": CONFIG[u"google_auth"][u"delegated_account"]
                })
            }
        }
    },
    u"task": {
        ProcessUserTask: {
            u"drive_io": Dependency(u"service.gs.DriveIO"),
            u"admin_io": Dependency(u"service.gs.AdminIO")
        }
    },
    u"api": {
        TaskApi: {
            u"taskqueue": taskqueue
        },
        MainApi: {
            u"taskqueue": taskqueue,
            u"admin_io": Dependency(u"service.gs.AdminIO")
        }
    }
}

FACTORY = Factory(FACTORY_CONFIG)
