# from flask import Flask, render_template, request


# app = Flask(__name__)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/motion', methods=['get', 'PUT'])
# def motion():
#     if request.method == 'PUT':
#         print(request.json)
#     else:


#     return 'Ok'

# from os import environ
# app.run(debug=False, port=environ.get("PORT",5000), host="0.0.0.0")