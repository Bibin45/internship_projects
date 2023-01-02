import mysql.connector
import json
import logging
from fun import read
from fun import create
from fun import login
from fun import cart
from fun import getcart
from fun import deletecart
from http.server import HTTPServer, BaseHTTPRequestHandler

mydb=mysql.connector.connect(host='localhost', user='root', password='Bibin@1234', database='flipkart')
def create_db():
    return 'CREATE DATABASE IF NOT EXISTS flipkart '
def create_tb():
    return 'CREATE TABLE IF NOT EXISTS user (id int(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,name VARCHAR(50),email VARCHAR(50),password VARCHAR(50),aadhar VARCHAR(50),address VARCHAR(200),phone VARCHAR(50),city VARCHAR(50),area VARCHAR(50),pin VARCHAR(50),cart json,myorders json )'
def alter_tb():                                                                                 #adding column
    return 'ALTER TABLE user ADD myorder TEXT(60000)'
def insert_tb():                                                                                #adding
    return 'INSERT INTO Todolist (Todos) VALUES("Mobile")'
def update_tb():
    return """UPDATE Todolist SET Location = %s WHERE Id = %s """                               #updating
arg=('Kerala',24)
def delete_tb():
    return'DELETE FROM Todolist WHERE  Id=1'                                                     #delete
def drop_db():
    return 'DROP DATABASE new_python'
def drop_tb():
    return 'DROP TABLE user'
mycursor = mydb.cursor()

mycursor.execute(create_tb())                                                           #calling insert,update,delete
mydb.commit()
print(mycursor.rowcount, "record(s) affected")
                                                                                        # to view
# def createproduct(mydb):                                    #to create all products
#     sql = """INSERT INTO product (myproduct) VALUES (%s)"""
#     f=open("myproduct.json",('r'))
#     input_data=f.read()
#     # input_data = (req_data.get('name'), req_data.get('image'), req_data.get('brand'), req_data.get('price'), req_data.get('rate'), req_data.get('description'))
#     cursor = mydb.cursor()
#     cursor.execute(sql, (input_data,) )
#     mydb.commit()
#     f.close()
#     cursor.close()
#     logging.warning("Record inserted successfully")
#     return "Record inserted successfully"
      
# createproduct(mydb) 

class GetHandler(BaseHTTPRequestHandler):
    def do_GET(self):                                   #to get in postman
        if self.path == '/read':
            try:
                if mydb.is_connected():
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin','*')
                    self.end_headers()
                    # call read function from read file
                    self.wfile.write(bytes(read(mydb), "utf-8"))

            except mysql.connector.Error as error:
                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))

        

    def do_POST(self):                                      #to post,update,create,delete in postman
        if self.path == '/create':
            try:
                if mydb.is_connected():
                    content_length = int(self.headers.get("Content-Length"))
                    body = self.rfile.read(content_length)
                    req_data = json.loads(body)
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin','*')
                    self.end_headers()
                    # call create function from fun file
                    self.wfile.write(bytes(create(mydb,req_data), "utf-8"))

            except mysql.connector.Error as error:
                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))

        elif self.path == '/getcart':
            try:
                if mydb.is_connected():
                    content_length = int(self.headers.get("Content-Length"))
                    body = self.rfile.read(content_length)
                    req_data = json.loads(body)
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin','*')
                    self.end_headers()
                    # call getcart function from fun file
                    self.wfile.write(bytes(getcart(mydb,req_data), "utf-8"))
            except mysql.connector.Error as error:
                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))

        elif self.path == '/deletecart':
            try:
                if mydb.is_connected():
                    content_length = int(self.headers.get("Content-Length"))
                    body = self.rfile.read(content_length)
                    req_data = json.loads(body)
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin','*')
                    self.end_headers()
                    # call deletecart function from fun file
                    self.wfile.write(bytes(deletecart(mydb,req_data), "utf-8"))

            except mysql.connector.Error as error:
                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))

        elif self.path == '/cart':

            try:
                if mydb.is_connected():
                    content_length = int(self.headers.get("Content-Length"))
                    body = self.rfile.read(content_length)
                    req_data = json.loads(body)
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin','*')
                    self.end_headers()
                    # call cart function from fun file
                    self.wfile.write(bytes(cart(mydb, req_data), "utf-8"))

            except mysql.connector.Error as error:

                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))

        elif self.path == '/login':

            try:
                if mydb.is_connected():
                    content_length = int(self.headers.get("Content-Length"))
                    body = self.rfile.read(content_length)
                    req_data = json.loads(body)
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin','*')
                    self.end_headers()
                    # call login function from fun file
                    self.wfile.write(bytes(login(mydb, req_data), "utf-8"))

            except mysql.connector.Error as error:

                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes("DB doesn't connected: {}".format(error), "utf-8"))

def main():
    httpd = HTTPServer(('localhost', 15000), GetHandler)
    print("Web server has been started")
    httpd.serve_forever()


if __name__ == "__main__":
    main()