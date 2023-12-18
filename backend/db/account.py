from datetime import datetime
from bson.objectid import ObjectId
from werkzeug.local import LocalProxy
from werkzeug.security import generate_password_hash, check_password_hash

from db import get_db
db = LocalProxy(get_db)

def create_user(name, email, username, password):
    hashedPassword = generate_password_hash(password)
    user_doc = {"name": name,
                "email": email,
                "username": username,
                "password": hashedPassword,
                "joinedAt": datetime.utcnow(),
                "lastSignedIn": datetime.utcnow(),
                "lastUpdated": datetime.utcnow()}
    user = db.users.find_one(
        {"$or": [{"username": username}, {"email": email}]})
    if user:
        return {"created": False, "db_message": "User already exists", "user": None}
    else:
        try:
            db.users.insert_one(user_doc)
            return {"created": True, "db_message": "User created successfully", "user": user_doc}
        except Exception as e:
            return {"created": False, "db_message": "User not created", "user": None, "error": e}


def get_user(usernameEmail, password):
    try:
        user = db.users.find_one(
            {"$or": [{"username": usernameEmail}, {"email": usernameEmail}]})
        if user:
            if check_password_hash(user['password'], password):
                db.users.update_one(
                    {"_id": ObjectId(user['_id'])},
                    {"$set": {"lastSignedIn": datetime.utcnow()}}
                )
                return {"authenticated": True, "db_message": "User found", "user": user}
            else:
                return {"authenticated": False, "db_message": "Incorrect password", "user": None}
        else:
            return {"authenticated": False, "db_message": "User not found", "user": None}
    except Exception as e:
        return {"authenticated": False, "db_message": "User not found", "user": None, "error": e}


def update_user(username, password, name, email):
    try:
        user = db.users.find_one({"username": username})
        if user:
            if check_password_hash(user['password'], password):
                hashedPassword = generate_password_hash(password)
                user_doc = {"name": name,
                            "email": email,
                            "username": username,
                            "password": hashedPassword,
                            "lastUpdated": datetime.utcnow()}
                result = db.users.update_one(
                    {"_id": ObjectId(user['_id'])},
                    {"$set": user_doc}
                )
                return {"updated": True, "db_message": "User updated successfully", "user": result}
            else:
                return {"updated": False, "db_message": "Incorrect password", "user": None}
        else:
            return {"updated": False, "db_message": "User not found", "user": None}
    except Exception as e:
        return {"updated": False, "db_message": "User not updated", "user": None, "error": e}


def delete_user(username, password):
    try:
        user = db.users.find_one({"username": username})
        if user:
            if check_password_hash(user['password'], password):
                result = db.users.delete_one({"username": username})
                return {"deleted": True, "db_message": "User deleted successfully", "user": result}
            else:
                return {"deleted": False, "db_message": "Incorrect password", "user": None}
        else:
            return {"deleted": False, "db_message": "User not found", "user": None}
    except Exception as e:
        return {"deleted": False, "db_message": "User not deleted", "user": None, "error": e}
