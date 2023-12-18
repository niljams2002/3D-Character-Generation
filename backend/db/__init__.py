from os import environ
from flask import current_app, g
from flask_pymongo import PyMongo

def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = PyMongo(current_app).cx[ environ.get('MONGO_DBNAME') ]
    return db
