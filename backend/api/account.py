from re import match
from flask import session
from flask_restful import Resource, reqparse

from utils import new_response
from db.account import create_user, get_user, update_user, delete_user

class AccountCheck(Resource):
    def __init__(self):
        pass

    def get(self):
        return new_response("Account Check API is up and running")

    def post(self):
        if 'user' in session:
            return new_response("User is signed in", {"signedIn": True, "user": session['user']})
        else:
            return new_response("User is not signed in", {"signedIn": False, "user": None})


class AccountSignUp(Resource):
    def __init__(self):
        pass

    def get(self):
        return new_response("Account Sign Up API is up and running")
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str, required=True)
        parser.add_argument("email", type=str, required=True)
        parser.add_argument("username", type=str, required=True)
        parser.add_argument("password", type=str, required=True)
        args = parser.parse_args()

        name = args["name"]
        email = args["email"]
        username = args["username"]
        password = args["password"]

        if ' ' in username:
            return new_response("Username cannot have spaces", is_error=True, status=400)
        if username.lower() != username:
            return new_response("Username must be lowercase", is_error=True, status=400)

        username = username.strip().lower()

        if not match(r"[^@]+@[^@]+\.[^@]+", email):
            return new_response("Email is not valid", is_error=True, status=400)

        email = email.strip().lower()
        if len(password) < 8:
            return new_response("Password must be at least 8 characters", is_error=True, status=400)

        response = create_user(name, email, username, password)
        if response.get('user'):
            del response['user']['password']

        if response['created']:
            return new_response("Account created", response)
        else:
            if response.get('error'):
                print(response['error'])
                return new_response("User not created", response, is_error=True, status=500)
            return new_response("Account not created", response, is_error=True, status=400)


class AccountSignIn(Resource):
    def __init__(self):
        pass

    def get(self):
        return new_response("Account Sign In API is up and running")

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("usernameEmail", type=str, required=True)
        parser.add_argument("password", type=str, required=True)
        args = parser.parse_args()

        usernameEmail = args["usernameEmail"]
        password = args["password"]

        if len(password) < 8:
            return new_response("Password must be at least 8 characters", is_error=True, status=400)

        response = get_user(usernameEmail, password)
        if response.get('user'):
            del response['user']['password']
    
        if response['authenticated']:
            session['user'] = response['user']
            return new_response("User authenticated", response)
        else:
            if response.get('error'):
                print(response['error'])
                return new_response("User not authenticated", response, is_error=True, status=500)
            return new_response("User not authenticated", response, is_error=True, status=400)


class AccountSignOut(Resource):
    def __init__(self):
        pass

    def get(self):
        return new_response("Account Sign Out API is up and running")
    
    def post(self):
        session.pop('user', None)
        return new_response("User signed out")


class AccountUpdate(Resource):
    def __init__(self):
        pass

    def get(self):
        return new_response("Account Update API is up and running")

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str, required=True)
        parser.add_argument("password", type=str, required=True)
        parser.add_argument("name", type=str, required=True)
        parser.add_argument("email", type=str, required=True)
        args = parser.parse_args()

        username = args["username"]
        password = args["password"]
        name = args["name"]
        email = args["email"]

        username = username.strip().lower()

        if not match(r"[^@]+@[^@]+\.[^@]+", email):
            return new_response("Email is not valid", is_error=True, status=400)

        email = email.strip().lower()
        if len(password) < 8:
            return new_response("Password must be at least 8 characters", is_error=True, status=400)

        response = update_user(username, password, name, email)
        if response.get('user'):
            del response['user']['password']

        if response['updated']:
            return new_response("Account updated", response)
        else:
            if response.get('error'):
                print(response['error'])
                return new_response("Account not updated", response, is_error=True, status=500)
            return new_response("Account not updated", response, is_error=True, status=400)


class AccountDelete(Resource):
    def __init__(self):
        pass

    def get(self):
        return new_response("Account Delete API is up and running")

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("username", type=str, required=True)
        parser.add_argument("password", type=str, required=True)
        args = parser.parse_args()

        username = args["username"]
        password = args["password"]

        if len(password) < 8:
            return new_response("Password must be at least 8 characters", is_error=True, status=400)

        response = delete_user(username, password)
        if response['deleted']:
            return new_response("Account deleted", response)
        else:
            if response.get('error'):
                print(response['error'])
                return new_response("Account not deleted", response, is_error=True, status=500)
            return new_response("Account not deleted", response, is_error=True, status=400)


class AccountAPI(Resource):

    def __init__(self):
        pass

    def dispatch_request(self, *args, **kwargs):
        action = kwargs.get('action')
        actions = {
            "check": AccountCheck,
            "signup": AccountSignUp,
            "signin": AccountSignIn,
            "signout": AccountSignOut,
            "update": AccountUpdate,
            "delete": AccountDelete,
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
