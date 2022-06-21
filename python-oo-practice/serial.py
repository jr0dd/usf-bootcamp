"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        self.start = start
        self.num = 0

    def generate(self):
        "Numbers from a starting number"
        if self.num == 0:
            self.num = self.start
        else:
            self.num += 1
        return self.num 

    def reset(self):
        "Reset number to starting position"
        self.num = 0
        return
