# coding: utf-8

import os
import fnmatch
import logging
from flask import Flask, send_from_directory, send_file, jsonify, redirect
from google.appengine.api import users

from config import CONFIG

formatter = logging.Formatter(u'%(message)s')
logger = logging.getLogger()

if not logger.handlers:
    handler = logging.StreamHandler()
else:
    handler = logger.handlers[0]

handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)

# Create flask server
APP = Flask(__name__)
APP.debug = CONFIG[u"app"][u"env"]

# App routes.
INDEX_FILE = None
for f in os.listdir('./dist'):
    if fnmatch.fnmatch(f, 'dev-index.html') or fnmatch.fnmatch(f, 'index.html'):
        INDEX_FILE = u"/".join([u"dist", f])


@APP.route('/logout')
def force_logout():
  logout_url = users.create_logout_url('/')
  return redirect(logout_url)


@APP.route('/<path:path>')
def send_client(path):
    """
    Handles client resources.
    """
    return send_from_directory('dist/', path)


@APP.errorhandler(404)
def send_index(e):
    """
    Redirect to client index file if not found.
    """
    return send_file(INDEX_FILE, cache_timeout=-1)

# Finally register the Db API blueprint
if __name__ == "__main__":
    APP.run(threaded=True, host=u"0.0.0.0", debug=True)
