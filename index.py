import os
import urllib

import webapp2
import jinja2
from google.appengine.ext import vendor
import logging

# Add any libraries installed in the "lib" folder.
vendor.add('lib')

from user_agents import parse

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainPage(webapp2.RequestHandler):
    def get(self):
        logging.info('Starting Main handler')

        imgpath = 'large'

        ua_string = self.request.headers['User-Agent']

        user_agent = parse(ua_string)

        if user_agent.is_mobile:
            imgpath = 'small'
        elif user_agent.is_tablet:
            imgpath = 'medium'

        template_values = {
            'imgpath': imgpath,
        }

        template = JINJA_ENVIRONMENT.get_template('index-partial.html')
        self.response.write(template.render(template_values))

class Works(webapp2.RequestHandler):

    def get(self, work):
        
        model = {
            'works': {
                "arya" : {
                    "topbar" : "Arya",
                    "template" : "works/cover-text-imgs.html",
                    "h1" : "Arya",
                    "h3" : "fatto @ NABA",
                    "tag" : "packaging, web",
                    "imgs" : [{
                        "src" : "//src"
                    }]
                }
            }
         }
        
        tmodel = model["works"][work]
        tmodel["work"] = work
        template = JINJA_ENVIRONMENT.get_template(tmodel["template"])
        
        self.response.write(template.render(tmodel))

app = webapp2.WSGIApplication([
    ('/index-partial', MainPage),
    webapp2.Route(r'/works/<work>', handler=Works)
], debug=True)
