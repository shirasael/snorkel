import json
import os
from flask import Flask, Response, request, render_template

app = Flask(__name__, static_url_path='', static_folder='public', template_folder='public')

class System(object):
	def __init__(self, name, configs):
		self.name = name
		self.configs = configs

@app.route('/system/<system_name>/<config_file>')
def sys(system_name, config_file):
	return render_template('index.html', system=system_name, config=config_file)

@app.route('/')
def root():
	return render_template('index.html')

@app.route('/systems', methods=['GET', 'POST'])
def systems():
	systems = [System("SYS-A", ["CFG_A", "CFG-B"]), System("SYS-B", ["CFG_A (B)", "CFG-B (B)"]), System("{{ SYS-C", ["{{{ CFG_A (C) }}}", "CFG-B (C)"]), System("I'm something else", ["other", "thing", "at all"])]
	return Response(json.dumps([s.__dict__ for s in systems]), mimetype='application/json', headers={'Cache-Control': 'no-cache'})

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=int(os.environ.get("PORT",3000)), debug=True)
