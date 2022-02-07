from flask import Flask
from flask_cors import CORS
from flask import jsonify
import pymongo
import json
#importar o .env para substituir as variaveis de conexão com o server


connection_url = 'mongodb+srv://%s:%s@cluster0.wjay6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'%(DB_User, DB_Password)

app = Flask(__name__)

client = pymongo.MongoClient(connection_url)
Database = client.get_database('Example')
SampleTable = Database.SampleTable

if __name__ == '__main__':
	print('Conectados com o Mongo')
	app.run(debug=True)

CORS(app)


#consultando

with open('task.json','r') as myfile:
	data=myfile.read()

obj = json.loads(data)


#routes
@app.route('/', methods=['GET'])
def getTasks():
	return jsonify(obj)

@app.route('/create', methods=['POST'])
def postTasks():
	req_data = request.get_json()
  obj.append(req_data)
	return jsonify(req_data)

@app.route('/update', methods=['UPDATE'])
def updateTasks():
	req_data = request.get_json()

	for idx, task in enumerate(obj):
		if task.get('task') == req_data["task"]:
			obj.pop(idx)
			obj.insert(idx, req_data)
			break
	return jsonify(req_data)

@app.route('/delete', methods=['DELETE'])
def deleteTasks():
	req_data = request.get_json()
	for idx, task in enumerate(obj):
		if task.get('task') == req_data["task"]:
			obj.pop(idx)
			return jsonify(req_data)
			
	return 'Item not found'





