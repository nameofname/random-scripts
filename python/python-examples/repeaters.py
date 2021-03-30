import threading, time

# Python doesn't have an equivalent to SetInterval()
# so I created this simple repeater class
# and a couple of simplified examples 

# test function to repeat :
def bleh():
    print('bleh')


def repeater(func):
    def ff():
        func()
        threading.Timer(2.0, repeater(func)).start()
    return ff

# Cleaner : 
def repeater1(func):
    time.sleep(2)
    func()
    repeater1(func)

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


# repeater(bleh)()
# repeater1(bleh)

repeater = Repeater(bleh, 1.0)
repeater.start()
print('started, lets wait 10')
time.sleep(10.0)
print('done waiting, lets stop')
repeater.stop()