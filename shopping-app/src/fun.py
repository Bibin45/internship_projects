import json
import logging

def read(mydb):
    sql = """select * from product"""
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(sql)
    results = json.dumps(cursor.fetchone())
    cursor.close()
    return results
                                                                  # to create user
def create(mydb, req_data):
    sql = """INSERT INTO user (name,email,password,aadhar,address,phone,city,area,pin,cart,myorders) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
    input_data = (req_data.get('name'), req_data.get('email'), req_data.get('password'), req_data.get('aadhar'),req_data.get('address'), req_data.get('phone'), req_data.get('city'), req_data.get('area'), req_data.get('pin'), json.dumps(req_data.get('cart')), json.dumps(req_data.get('myorders')))
    cursor = mydb.cursor()
    cursor.execute(sql, input_data)
    mydb.commit()
    cursor.close()
    logging.warning("Record inserted successfully")
    return "Record inserted successfully"

def login(mydb, req_data):
    sql = """SELECT * from user WHERE email = %s AND password = %s"""
    input_data = (req_data.get('email'), req_data.get('password'))
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(sql, input_data)
    results = json.dumps(cursor.fetchone())
    cursor.close()
    return results 

def getcart(mydb, req_data):
    sql = """SELECT cart from user WHERE email = %s """
    input_data = (req_data.get('email'),)
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(sql, input_data)
    results = json.dumps(cursor.fetchone())
    cursor.close()
    return results       

def deletecart(mydb, req_data):
    sql = """UPDATE user SET cart=JSON_REMOVE(cart,'$[%s]') WHERE email=%s"""
    input_data = (req_data.get('index'),req_data.get('email'))
    cursor = mydb.cursor(dictionary=True)
    cursor.execute(sql, input_data)
    mydb.commit()
    results = json.dumps(cursor.fetchall())
    cursor.close()
    return results 
                                                              #to update
def cart(mydb, req_data):
    sql = """UPDATE user SET cart = %s WHERE email = %s"""
    input_data = (json.dumps(req_data.get('cart')), req_data.get('email'))
    cursor = mydb.cursor()
    cursor.execute(sql , input_data)
    mydb.commit()
    cursor.close()
    logging.warning ("Added To Cart")
    return "Added To Cart"
 
