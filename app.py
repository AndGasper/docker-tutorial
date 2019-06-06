from flask import Flask
from flask import Response
from redis import Redis, RedisError
import os
import socket

# Connect to Redis
redis = Redis(host="redis", db=0, socket_connect_timeout=2, socket_timeout=2)

app = Flask(__name__)

@app.route("/")
def hello():
    try:
        visits = redis.incr("counter")
    except RedisError:
        visits = "<i>Cannot connect to redis, counter disabled</i>"
    
    html = "<h3>Hello {name}!</h3>"\
        "<b>Hostname:</b> {hostname}<br/>"\
        "<b>Visits:</b> {visits}"
    return html.format(name=os.getenv("NAME", "world"), hostname=socket.gethostname(), visits=visits)

@app.route("/container-name")
def container_name():
    response = Response()
    response.headers['container-id'] = "{hostname}".format(hostname=socket.gethostname())
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)