import itertools

class C():
    id_iter = itertools.count()

    def __init__(self, text='text', parent = -1):
        self.id = next(self.id_iter)
        self.text = text
        self.parent = -1


com = [C(f'comment {i}') for i in range(10)]
com[4].parent = 2
com[3].parent = 2
com[5].parent = 3




def getcomments():
    out = []
    for i in com:
        if i.parent == -1:
            out.append(i)
    return out

def expanded(id = 0):
    out = []
    for i in com:
        if i.parent == id:
            out.append(i)
    return out



allcomments = getcomments()

out = ''
for i in allcomments:
    out += i.text
    if expanded(i.id) != []:
        for e in expanded(i.id):
            out += f'\n    {e.text}'
    out += '\n'
    
print(out)


while 1:
    ans = int(input('expand: '))
    for i in expanded(ans):
        print(i.text)
    print('\n')