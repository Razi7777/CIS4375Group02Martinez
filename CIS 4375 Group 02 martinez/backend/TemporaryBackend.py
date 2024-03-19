#temporary file
import flask
from flask import Flask
from flask import jsonify
from flask import request




#stuff to connect to mysql database, same as homework 2
import mysql.connector
from mysql.connector import Error




conn = None
try:
    conn = mysql.connector.connect(host='database-1.ctg4cmcekkyo.us-east-2.rds.amazonaws.com',
                                       database='PrototypeDB',
                                       user='admin',
                                       password='Sevenseven7!')
    if conn.is_connected():
            print('Connected to MySQL database')

except Error as e:
    print(e)

#passing in dictionary as true so we can get our get Apis in a nice dictionary form, same as homework 2
cursor = conn.cursor(dictionary=True)


app = flask.Flask(__name__)#Setting up application name
app.config['DEBUG'] = True #allow to show errors in browser


#the username and password for our login
authorized_user = [
{
        'username': 'myusername',
        'password': 'mypassword',
        'role': 'default',
}
]

authorized_username = [{'username': 'myusername'}]



#login api, used the example from class 6
@app.route('/api/usernamepw', methods=['POST'])
def usernamepw_example():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Invalid request. Username and password are required."}), 400

    username = data['username']
    password = data['password']

    for user in authorized_user:
        if user['username'] == username and user['password'] == password:
            return jsonify('You are authorized.')
    
    return jsonify({"error": "Invalid credentials."}), 

@app.route('/api/usernamepwjavascript1', methods=['GET'])
def usernamepw_examplejavascript():
    return jsonify(authorized_username)


app.run()