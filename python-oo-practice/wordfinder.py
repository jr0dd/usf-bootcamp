import random

"""Word Finder: finds random words from a dictionary."""


class WordFinder:
    """Find words from file and generate list
    
    >>> wf = WordFinder('/usr/share/dict/words')
    235886 words read

    >>> wf.random() # doctest: +SKIP

    """
    def __init__(self, filename):
        self.filename = filename
        self.words_list = []
        self.generate_list()

    def generate_list(self):
        "Generate list from file"
        with open(self.filename, 'r') as file:
            for line in file:
                self.words_list.append(line.rstrip())
        print(str(len(self.words_list)) + ' words read')

    def random(self):
        "Returns a random word from words list"
        return random.choice(self.words_list)


class SpecialWordFinder(WordFinder):
    """Finds random words, ommiting blank lines and comments
    
    >>> swf = SpecialWordFinder('foods.txt')
    9 words read

    >>> swf.random() # doctest: +SKIP
    
    """
    def __init__(self, filename):
        super().__init__(filename)
        self.filtered_list = []

    def random(self):
        for word in self.words_list:
            if word and not word.startswith('#'):
                self.filtered_list.append(word)
        return random.choice(self.filtered_list)

