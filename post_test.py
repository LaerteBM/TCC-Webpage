import requests

url = 'http://127.0.0.1:5000/post_data'
headers = {'Accept' : 'application/json', 'Content-Type' : 'application/json'}

data = {'sexo' : 'F',
        'idade' : 22,
        'RMSSD' : 100.0,
        'temperatura' : 20,
        'umidade' : 90,
        'luminancia' : 5000}

r = requests.post(url, json=data, headers=headers)
