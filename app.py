from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dados.sqlite3'
app.config['SECRET_KEY'] = "senha_secreta"

db = SQLAlchemy()
db.init_app(app)
CORS(app)

class Sensor(db.Model):
    id = db.Column('sensor_id', db.Integer, primary_key = True)
    timestamp = db.Column(db.DateTime,nullable=False, default=datetime.utcnow)
    sexo = db.Column(db.String(1))
    idade = db.Column(db.Integer)
    RMSSD = db.Column(db.Float)
    temperatura = db.Column(db.Float)
    umidade = db.Column(db.Float)
    luminancia = db.Column(db.Float)

    def __init__(self,sexo,idade,RMSSD,temp,umidade,lumi):
        self.sexo = sexo
        self.idade = idade
        self.RMSSD = RMSSD
        self.temperatura = temp
        self.umidade = umidade
        self.luminancia = lumi

with app.app_context():
    db.create_all()


@app.route('/index')
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/post_data', methods=['POST'])
def post_data():
    dados = request.get_json()
    sensor = Sensor(dados['sexo'],
                    dados['idade'],
                    dados['RMSSD'],
                    dados['temperatura'],
                    dados['umidade'],
                    dados['luminancia'])
    db.session.add(sensor)
    db.session.commit()
    return 'ok'

@app.route('/get_data')
def get_data():
    res = db.session.execute(db.select(Sensor).order_by(Sensor.id)).first()[0]
    print(res.sexo)
    return '200'


if __name__ == '__main__':
    app.run(debug=True)