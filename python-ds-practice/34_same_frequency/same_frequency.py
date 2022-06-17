from optparse import Values


def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """

    freq1 = {}
    freq2 = {}

    for x in str(num1):
        if x in freq1:
            freq1[x] +=1
        else:
            freq1[x] = 1 

    for y in str(num2):
        if y in freq2:
            freq2[y] +=1
        else:
            freq2[y] = 1

    if freq1 == freq2:
        return True
    else:
        return False