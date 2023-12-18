from flask import jsonify, make_response

def respond(message, data=None, is_error=False, status=200):
    resp = {"error": is_error, "message": message}
    if data is not None:
        resp = {**resp, **data}
    return jsonify(resp), status

def new_response(message, data=None, is_error=False, status=200):
    resp = {"error": is_error, "message": message}
    if data is not None:
        resp = {**resp, **data}
    return make_response(jsonify(resp), status)
