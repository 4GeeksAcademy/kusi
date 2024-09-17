# This module takes care of starting the API Server, Loading the DB and Adding the endpoints
from flask import Blueprint
from flask_cors import CORS

api = Blueprint("api", __name__)
CORS(api)
