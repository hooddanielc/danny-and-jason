from bottle import route, run, static_file, default_app

# import all page routes
from pages import *

# route static files to static folder
# static folder is relative to this python file
@route('/static/<filepath:path>')
def server_static(filepath):
  return static_file(filepath, root='static')

# uncomment this line to use bottle http server instead of wsgi
run(host='0.0.0.0', port=888, debug=True)

application = default_app()
