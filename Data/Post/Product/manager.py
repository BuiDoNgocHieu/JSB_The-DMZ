import jsonmanager
import uuid
f = jsonmanager.JsonOutsideFile("Data/Post/Product/Product-renew.json")
raw = jsonmanager.JsonOutsideFile("Data/Post/Product/Product-data.json")
s = raw.getfile()
res = []
for i in s:
    i["id"] = uuid.uuid4().hex
    res.append(i)
    print(i)
f.AddToFile(0,"data",res)
