if __name__ == '_main_':
    n = int(input().strip())
    if n%2: print("Weird")
    else:
        if 2<=n<=5 or n>20: print("Not Weird")
        else: print("Wierd")

