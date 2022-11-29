import requests

# url = 'http://127.0.0.1:5000/post_data'
url = 'https://tcc-laerte.onrender.com/post_data'

headers = {'Accept' : 'application/json', 'Content-Type' : 'application/json'}

data = {'sexo' : 'M',
        'idade' : 30,
        'RMSSD' : 170.0,
        'temperatura' : 20,
        'umidade' : 50,
        'luminancia' : 8000}

r = requests.post(url, json=data, headers=headers)
