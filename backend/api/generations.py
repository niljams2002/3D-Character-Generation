from io import BytesIO
from os import environ
from zipfile import ZipFile
from flask import session, Response
from flask_restful import Resource, reqparse
from requests import get as getRequest, post as postRequest

from utils import new_response
from db.generations import create_generation, get_generation, list_generations, delete_generation

class GenerationsList(Resource):
    def __init__(self):
        pass

    def get(self):
        return new_response("Generations List API is up and running")
    
    def post(self):
        if 'user' not in session:
            return new_response("User is not signed in", is_error=True, status=400)
        
        response = list_generations(session['user']['username'])
        if response['listed']:
            return new_response("Generations listed", response)
        else:
            if response.get('error'):
                print(response['error'])
                return new_response("Generations not listed", response, is_error=True, status=500)
            return new_response("Generations not listed", response, is_error=True, status=400)


class GenerationsFetch(Resource):
    def __init__(self):
        pass

    def get(self):
        return new_response("Generations Fetch API is up and running")
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("generationID", type=str, required=True)
        args = parser.parse_args()

        generationID = args["generationID"]

        if 'user' not in session:
            return new_response("User is not signed in", is_error=True, status=400)
        
        response = get_generation(session['user']['username'], generationID)
        if response['fetched']:
            if response.get('generation'):
                del response['generation']['files']
            return new_response("Generations fetched", response)
        else:
            if response.get('error'):
                print(response['error'])
                return new_response("Generations not fetched", response, is_error=True, status=500)
            return new_response("Generations not fetched", response, is_error=True, status=400)


class GenerationsCheck(Resource):
    def __init__(self):
        pass

    def get(self):
        return new_response("Generations Check API is up and running")
    
    def post(self):
        check = getRequest(environ.get('MODEL_API_URL') + '/check', headers={ "Content-Type" : "application/json", "ngrok-skip-browser-warning" : "1" })
        if check.status_code != 200:
            return new_response("Model server is not running", {"status": "down"}, is_error=True, status=500)
        return new_response("Model server is running", {"status": "up"})


class GenerationsGenerate(Resource):
    def __init__(self):
        pass

    def is_valid_features(features, feature_options):
        if not features:
            return False
        for featureName, featureValue in features.items():
            if featureName.lower() not in feature_options.keys():
                return False
            if featureValue.lower() not in feature_options[featureName.lower()]:
                return False        
        return True

    def get(self):
        return new_response("Generations Generate API is up and running")
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("features", type=dict, required=True)
        args = parser.parse_args()
        features = args["features"]

        if 'user' not in session:
            return new_response("User is not signed in", is_error=True, status=400)

        feature_options_face = {
            "eyes": ["brown", "black", "blue", "green", "hazel"],
            "hair": ["brown", "black", "blonde", "red", "brunette"],
            "skin": ["white", "black", "brown", "tan", "olive", "pale"],
            "lips": ["thin", "full"],
            "nose": ["straight", "curved", "pointed"],
            "chin": ["double", "single"],
            "cheeks": ["high", "low", "rosy"],
            "eyebrows": ["arched", "straight", "bushy"],
            "facial_hair": ["none", "beard", "moustache", "goatee", "sideburns", "full beard"],
            "face_shape": ["oval", "round", "square", "heart"],
            "age": ["young", "middle-aged", "old"],
        }

        feature_options_body = {
            "gender": ["male", "female"],
            "height": ["average", "tall", "short"],
            "weight": ["average", "thin", "fat"],
            "build": ["average", "muscular", "athletic"],
            "hair": ["short", "long", "bald", "wavey"],
        }

        if not GenerationsGenerate.is_valid_features(features.get("face"), feature_options_face):
            return new_response("Invalid face features", is_error=True, status=400)
        
        if not GenerationsGenerate.is_valid_features(features.get("body"), feature_options_body):
            return new_response("Invalid body features", is_error=True, status=400)
        
        check = getRequest(environ.get('MODEL_API_URL') + '/check', headers={ "Content-Type" : "application/json", "ngrok-skip-browser-warning" : "1" })
        if check.status_code != 200:
            return new_response("Model server is not running", {"status": "down"}, is_error=True, status=500)
        
        prompt = {"face" : "HD realistic front view face photo of a " + features['body']['gender'] + " with ", "body" : "HD realistic full-body image of a " + features['face']['age'] + features['body']['gender'] + " standing in an open space with grey background facing towards the camera with"}
        
        bodyFeatures = features.get('body')
        faceFeatures = features.get('face')
        
        for bodyFeatureName, bodyFeatureValue in bodyFeatures.items():
            if bodyFeatureValue.lower() == "none":
                continue
            prompt['body'] += " " + bodyFeatureValue + " " + bodyFeatureName + ","
        prompt['body'] = prompt['body'][:-1] + "."

        for faceFeatureName, faceFeatureValue in faceFeatures.items():
            if faceFeatureValue.lower() == "none":
                continue
            if faceFeatureName.lower() == "hair":
                prompt['face'] += " " + features['body']['hair'] + faceFeatureValue + " hair,"
            prompt['face'] += " " + faceFeatureValue + " " + faceFeatureName+ ","
        prompt['face'] = prompt['face'][:-1] + "."

        try:
            zipFileRequest = postRequest(environ.get('MODEL_API_URL') + '/generate',
                                     headers={ "Content-Type" : "application/json", "ngrok-skip-browser-warning" : "1" },
                                      json={"prompt":prompt}, stream=True)
        except Exception as e:
            return new_response("Model server returned an error", {"status": "error"}, is_error=True, status=500)
        
        if zipFileRequest.status_code != 200:
            return new_response("Model server returned an error", {"status": "error"}, is_error=True, status=500)
        
        zipFile = zipFileRequest.content
        response = create_generation(session['user']['username'], features, zipFile)
        if response['created']:
            if response.get('generation'):
                del response['generation']['files']
            return new_response("Generations created", response)
        return new_response("Generations not created", response, is_error=True, status=400)


class GenerationsDelete(Resource):
    def __init__(self):
        pass

    def get(self):
        return new_response("Generations Delete API is up and running")

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("generationID", type=str, required=True)
        args = parser.parse_args()

        generationID = args["generationID"]

        if 'user' not in session:
            return new_response("User is not signed in", is_error=True, status=400)

        response = delete_generation(session['user']['username'], generationID)
        if response['deleted']:
            return new_response("Generations deleted", response)
        else:
            if response.get('error'):
                print(response['error'])
                return new_response("Generations not deleted", response, is_error=True, status=500)
            return new_response("Generations not deleted", response, is_error=True, status=400)


class GenerationsTestGen(Resource):
    def __init__(self):
        pass

    def get(self):
        zipFileRequest = getRequest('http://localhost:5000/static/files.zip', stream=True)
        if zipFileRequest.status_code != 200:
            return new_response("Model server is not running", is_error=True, status=500)
        
        zipFile = zipFileRequest.content
        response = create_generation('admin', features={}, zipFile=zipFile)
        if response['created']:
            if response.get('generation'):
                del response['generation']['files']
            print(response)
            return new_response("Generations created", response)
        return new_response("Generations not created", response, is_error=True, status=400)
    
    def post(self):
        zipFileRequest = getRequest('http://localhost:5000/static/files.zip', stream=True)
        if zipFileRequest.status_code != 200:
            return new_response("Model server is not running", is_error=True, status=500)
        
        zipFile = zipFileRequest.content
        response = create_generation('admin', features={}, zipFile=zipFile)
        if response['created']:
            if response.get('generation'):
                del response['generation']['files']
            print(response)
            return new_response("Generations created", response)
        return new_response("Generations not created", response, is_error=True, status=400)
    
class GenerationsAPI(Resource):

    def __init__(self):
        pass

    def dispatch_request(self, *args, **kwargs):
        action = kwargs.get('action')
        actions = {
            "list": GenerationsList,
            "fetch": GenerationsFetch,
            "check": GenerationsCheck,
            "generate": GenerationsGenerate,
            "delete": GenerationsDelete,
            "testGen": GenerationsTestGen
        }

        if action in actions:
            kwargs.pop('action', None)
            return actions[action]().dispatch_request(*args, **kwargs)
        else:
            return new_response("Invalid action", is_error=True, status=400)

    def get(self, action):
        return self.dispatch_request(action=action)
    
    def post(self, action):
        return self.dispatch_request(action=action)


class GenerationsFileAPI(Resource):
    def __init__(self):
        pass

    def get(self, *args, **kwargs):
        filename = kwargs.get('filename')
        generationID = kwargs.get('generationID')

        if 'user' not in session:
            return new_response("User is not signed in", is_error=True, status=400)
        
        response = get_generation(session['user']['username'], generationID)
        if response['fetched']:
            if filename == 'zip':
                files = response['generation']['files']
                zipFile = BytesIO()
                with ZipFile(zipFile, 'w') as zip:
                    for file in files:
                        zip.writestr(file['filename'], file['content'])
                zipFile.seek(0)
                response = Response(zipFile, mimetype='application/zip')
                response.headers['Content-Disposition'] = 'filename=results.zip'
                return response
            else:
                for file in response['generation']['files']:
                    if file['filename'] == filename:
                        fileContent = file['content']
                        fileData = BytesIO(fileContent)
                        response = Response(fileData, mimetype=file['mimetype'])
                        response.headers['Content-Disposition'] = 'filename=' + filename
                        return response
                if response.get('generation'):
                    del response['generation']['files']
                return new_response("File not found", response, is_error=True, status=400)
        else:
            return new_response("Generations not fetched", response, is_error=True, status=400)
        
    def post(self):
        return new_response("Generations Fetch API is up and running")

