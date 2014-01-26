from page import Component

class PageBase(Component):
  def __init__(self, page):
    super(PageBase, self).__init__()

  @property
  def body(self):
    return ""

  CSS_NAMES = ('static/modules/page-base/page-base.css',)
  JS_NAMES = ('static/modules/page-base/page-base.js',)
  MUSTACHE_DICT = {
    'page-base': file('static/modules/page-base/page-base.mustache').read()
  }