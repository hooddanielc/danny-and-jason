# If we don't want to use a server at all and only 
# be responsible for delivering static html, css, and javascript
# use this script to render website to deploy.html

import dannyandjason
from shutil import copytree, ignore_patterns, rmtree
from os.path import splitext

SRC = 'static'
DST = 'deploy_html/static'
NAMES = ( '.DS_Store', )
EXTS = ( '.mustache', '.js', '.css', '.png', '.jpeg', '.jpg', '.gif' )

def IsMatch(name):
  if name in NAMES:
    return True
  _, ext = splitext(name)
  return not ext or ext in EXTS

def FilterNames(_, names):
  return [ name for name in names if not IsMatch(name) ]

def main():
  rmtree(DST)
  copytree(SRC, DST, ignore=FilterNames)

if __name__ == '__main__':
  main()