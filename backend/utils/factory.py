from os import environ , listdir
from flask import Flask, send_from_directory
from flask.json import JSONEncoder
from flask_cors import CORS
from flask_restful import Api
from flask_session import Session
from bson import json_util, ObjectId
from datetime import datetime

from utils import respond
from api.account import AccountAPI
from api.generations import GenerationsAPI, GenerationsFileAPI

class MongoJsonEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        if isinstance(obj, ObjectId):
            return str(obj)
        return json_util.default(obj, json_util.CANONICAL_JSON_OPTIONS)


def create_app():
    app = Flask('CharGen-Backend')

    app.config['DEBUG'] = environ.get('DEBUG') or False
    app.config['SECRET_KEY'] = environ.get('SECRET_KEY')

    app.config['MONGO_DBNAME'] = environ.get('MONGO_DBNAME')
    app.config['MONGO_URI'] = environ.get('MONGO_URI') + '/' + environ.get('MONGO_DBNAME')

    app.config["SESSION_PERMANENT"] = True
    app.config['SESSION_USE_SIGNER'] = True
    app.config["SESSION_KEY_PREFIX"] = "session:"
    app.config["SESSION_TYPE"] = "mongodb"
    app.config["SESSION_MONGODB_DB"] = environ.get('MONGO_DBNAME')
    app.config["SESSION_MONGODB_COLLECT"] = "sessions"

    CORS(app)
    Session(app)
    app.api = Api(app)
    app.json_encoder = MongoJsonEncoder

    app.api.add_resource(AccountAPI, '/api/account/<string:action>')
    app.api.add_resource(GenerationsAPI, '/api/generations/<string:action>')
    app.api.add_resource(GenerationsFileAPI, '/api/generations/<string:generationID>/<string:filename>')

    @app.route('/', methods=['GET', 'POST'])
    def index():
        return respond("Server is up and running")

    @app.route('/static', methods=['GET', 'POST'])
    def list():
        files = listdir('static')
        return respond("List of files", data={"files": files})

    @app.route('/static/<path:path>', methods=['GET', 'POST'])
    def serve(path):
        return send_from_directory('static', path) 

    @app.route('/api', methods=['GET', 'POST'])
    def api():
        return respond("API is up and running")

    @app.errorhandler(404)
    def not_found(e):
        return respond("404 Not Found", is_error=True, status=404)

    return app
