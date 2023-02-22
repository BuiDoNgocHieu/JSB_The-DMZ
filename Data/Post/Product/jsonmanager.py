"""
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░╔═══╦═══╦═══╦══╦═══╦═╗░╔╦════╗░░░░╔═══╦═══╦═══╦═══╗░
░║╔═╗║╔═╗╠╗╔╗╠╣╠╣╔═╗║║╚╗║║╔╗╔╗║░░░░║╔═╗║╔═╗║╔═╗║╔═╗║░
░║╚═╝║║░║║║║║║║║║║░║║╔╗╚╝╠╝║║╚╝░░░░╚╝╔╝║║║║╠╝╔╝╠╝╔╝║░
░║╔╗╔╣╚═╝║║║║║║║║╚═╝║║╚╗║║░║║░░╔══╗╔═╝╔╣║║║╠═╝╔╬═╝╔╝░
░║║║╚╣╔═╗╠╝╚╝╠╣╠╣╔═╗║║░║║║░║║░░╚══╝║║╚═╣╚═╝║║╚═╣║╚═╗░
░╚╝╚═╩╝░╚╩═══╩══╩╝░╚╩╝░╚═╝░╚╝░░░░░░╚═══╩═══╩═══╩═══╝░
░By zeaky @2022 This libary is not done - 10.24.22░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
This libary is used in many project as SUB-CODE, Libary made by ZEAKY THE DRANKY
"""
import json


class JsonOutsideFile:
    def __init__(self, direction):
        self.direction = direction
        try:
            f = open(self.direction, 'r')
            print("File usable [Simple json manager]")
        except:
            raise Exception("An error with file open, check file direction,... CODE: -120")
        pass
    def AddToFile(self, pos, key, JSON):
        """
        Change JSON data in outside file, require: Data pos, data name/key
        JSON data
        !!! IF YOU DONT NEED AN POS FOR IT, use 'None' insteed
        Ex: 
            v = SimpleJsonManagerByZeak.jsonOutsideFile("test.json")
            v.AddToFile(0, 'Test', 123)
        Result in test.json: 
            {'test':'123'}
        """
        if(str(type(JSON)) != "<class 'dict'>" and str(type(JSON)) != "<class 'list'>"):
            return -1
        try:
            with open(self.direction, 'r') as openfile:
                # Reading from json file
                json_object = json.load(openfile)
            if key == None:
                json_object[pos] = JSON
                print(f"added data {JSON} to [{pos}]")
            elif key != None:
                json_object[pos][key] = JSON
                print(f"added data {JSON} to [{pos}] as [{key}]")
            elif pos == None:
                json_object[key] = JSON
                print(f"added data {JSON} as [{key}]")
            else:
                print(f"Some error when adding data [ {JSON} ] to [ {pos} ] as(optional) [ {key} ]")
            with open(self.direction, "w") as outfile:
                json.dump(json_object, outfile)
            return True
        except:
            return -2
    def AddToFileWithTry(self, duration, pos, key, JSON):
        masty = 0
        while True and not duration > masty :
            f = self.AddToFile(pos, key, JSON)
            if f != -1 and f != -2:
                print("Success from adding data to file [SimpleJsonManager]")
            else:
                print(f"Got error, retry [{masty}]/[{duration}]")
                print(f"Error case: [{f}]")

    def DeleteKey(self, pos, key):
        try:
            with open(self.direction, 'r') as openfile:
                # Reading from json file
                json_object = json.load(openfile)
            del json_object[pos][key]
            with open(self.direction, "w") as outfile:
                json.dump(json_object, outfile)
            return True
        except:
            return -2
    def getfile(self):
        with open(self.direction, 'r') as openfile:
                # Reading from json file
                json_object = json.load(openfile)
                return json_object

def string_to_json(str):
    return json.loads(str)


class localJson:
    def __init__(self) -> None:
        self.data = {}
        pass
    def AddKey(self, name, value):
        pass
    #in develop
