from flask import Flask, request, redirect
from flask_wtf.csrf import CSRFProtect
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ['APP_SECRET_KEY']
csrf = CSRFProtect(app)

from getip.getip.routes import getip_routes

@app.before_request
def check_endpoint():
    allowed_routes = [
        'static',
        'getip',
        'get_ip_by_url'
    ]

    if request.endpoint not in allowed_routes:
        return redirect('/')