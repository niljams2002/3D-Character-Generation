from io import BytesIO
from zipfile import ZipFile
from datetime import datetime
from mimetypes import guess_type
from bson.objectid import ObjectId
from werkzeug.local import LocalProxy

from db import get_db
db = LocalProxy(get_db)

def create_generation(username, features, zipFile):
    try:
        generation_doc = { 
            "username": username,
            "features": features,
            "files": [],
            "createdAt": datetime.utcnow(),
            "lastRetrieved": datetime.utcnow()
        }
        with ZipFile(BytesIO(zipFile)) as zip:
            for fileInfo in zip.infolist():
                if fileInfo.filename[-1] == '/':
                    continue
                with zip.open(fileInfo) as file:
                    fileData = zip.read(fileInfo.filename)
                    mimetype = guess_type(fileInfo.filename)[0]
                    generation_doc['files'].append({
                        "filename": fileInfo.filename,
                        "size": fileInfo.file_size,
                        "mimetype": mimetype,
                        "content": fileData
                    })
        user = db.users.find_one({"username": username})
        if user:
            generation = db.generations.insert_one(generation_doc)
            generationID = generation.inserted_id
            db.users.update_one(
                {"username": username},
                {"$push": {"generations": generationID}}
            )
            return {"created": True, "db_message": "Generation created successfully", "generation": generation_doc}
        else:
            return {"created": False, "db_message": "User not found", "generation": None}
    except Exception as e:
        return {"created": False, "db_message": "Generation not created", "generation": None, "error": e}


def get_generation(username, generationID):
    try:
        valid = ObjectId.is_valid(generationID)
        if not valid:
            return {"fetched": False, "db_message": "Generation not found", "generation": None}
        
        user = db.users.find_one({"username": username})
        if user:
            if ObjectId(generationID) not in user['generations']:
                return {"fetched": False, "db_message": "Generation not found", "generation": None}
            generation = db.generations.find_one({"_id": ObjectId(generationID)})
            db.generations.update_one(
                {"_id": ObjectId(generationID)},
                {"$set": {"lastRetrieved": datetime.utcnow()}}
            )
            if generation:
                return {"fetched": True, "db_message": "Generation found", "generation": generation}
            else:
                return {"fetched": False, "db_message": "Generation not found", "generation": None}
        else:
            return {"fetched": False, "db_message": "User not found", "generation": None}
    except Exception as e:
        return {"fetched": False, "db_message": "Generation not found", "generation": None, "error": e}


def list_generations(username):
    try:
        user = db.users.find_one({"username": username})
        if user:
            generations = user['generations'] if user['generations'] else []
            return {"listed": True, "db_message": "Generations listed successfully", "generations": generations}
        else:
            return {"listed": False, "db_message": "User not found", "generations": None}
    except Exception as e:
        return {"listed": False, "db_message": "Generations not listed", "generations": None, "error": e}
    

def delete_generation(username, generationID):
    try:
        valid = ObjectId.is_valid(generationID)
        if not valid:
            return {"deleted": False, "db_message": "Generation not found", "generation": None}
        
        user = db.users.find_one({"username": username})
        if user:
            if ObjectId(generationID) not in user['generations']:
                return {"deleted": False, "db_message": "Generation not found", "generation": None}
            result = db.generations.delete_one({"_id": ObjectId(generationID)})
            db.users.update_one(
                {"username": username},
                {"$pull": {"generations": ObjectId(generationID)}}
            )
            return {"deleted": True, "db_message": "Generation deleted successfully", "generation": result}
        else:
            return {"deleted": False, "db_message": "User not found", "generation": None}
    except Exception as e:
        return {"deleted": False, "db_message": "Generation not deleted", "generation": None, "error": e}

