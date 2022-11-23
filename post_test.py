import requests

url = 'http://127.0.0.1:5000/post_data'
headers = {'Accept' : 'application/json', 'Content-Type' : 'application/json'}

data = {'sexo' : 'M',
        'idade' : 18,
        'RMSSD' : 10.0,
        'temperatura' : 24,
        'umidade' : 88,
        'luminancia' : 1000}

r = requests.post(url, json=data, headers=headers)
