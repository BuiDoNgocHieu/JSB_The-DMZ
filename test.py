a= int(input())
b=int(input())
if b>=(a/2):
    print("-1")
else:
    for i in range(1, 10**12+1):
        if (a%i == b):
            print(i)
            break