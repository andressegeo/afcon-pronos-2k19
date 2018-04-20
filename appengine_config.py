# coding: utf-8
from google.appengine.ext import vendor
import os,sys
# Add any libraries installed in the "lib" folder.
vendor.add(u'lib')

on_appengine = os.environ.get('SERVER_SOFTWARE','').startswith('Development')
if on_appengine and os.name == 'nt':
 	sys.platform = "Not Windows"
