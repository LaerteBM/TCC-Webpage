from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dados.sqlite3'
app.config['SECRET_KEY'] = "senha_secreta"

db = SQLAlchemy()
db.init_app(app)

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
        self.lumi = lumi


@app.route('/index')
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)