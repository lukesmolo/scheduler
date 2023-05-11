from op import Op

class TestOp(Op):
    def __init__(self):
        # TODO: your code here
        pass
    def execute(self):
        print('python test executed')

obj = TestOp()
obj.execute()