# coding: utf-8
"""
Configuration file.
"""
import logging


CONFIG = {
    u"google_auth": {
        u"service_account": u"service_account.json",
        u"delegated_account": u"admin.gpartner@kiloutou.fr"
    },
    u"logging": {
        u"level": logging.INFO,
        u"pattern": u'%(levelname)s - %(asctime)s : %(message)s',
        u"pattern_debug": u'[%(filename)15s::%(funcName)15s]-[l.%(lineno)3s] %(message)s'
    },
    u"app": {
        u"env": u"production",
        u"debug": False,
    }
}
