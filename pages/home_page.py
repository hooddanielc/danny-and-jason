from bottle import route
from page import Page
from components import page_base

class MyPage(Page):
  def __init__(self):
    super(MyPage, self).__init__()
    self.page_base = page_base.PageBase(self)

  @property
  def title(self):
    return "Danny & Jason"

  JS_NAMES = ('static/pages/home-page/home-page.js',)

@route('/index.html')
def route_home():
  return MyPage().render()

f = open('deploy_html/index.html', 'w+')
f.write(MyPage().render())