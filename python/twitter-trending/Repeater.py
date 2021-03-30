import threading

# Stop and start functionality 
class Repeater():
    def __init__(self, func, timeout):
        self.go = False
        self.func = func
        self.timeout = timeout

    def _rep(self):
        if (self.go):
            self.func()
            threading.Timer(self.timeout, self._rep).start()

    def start(self):
        self.go = True
        self._rep()
    
    def stop(self):
        self.go = False

