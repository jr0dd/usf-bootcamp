def print_upper_words(words):
    """Given list of words, print words in uppercase on a new line.

    For example:
      print_upper_words(['hello', 'hey', 'goodbye', 'yo', 'yes'])

    Should print:
      'HELLO'
      'HEY'
      'YO'
      'YES'
    """

    for word in words:
        print(word.upper())

print_upper_words(['hello', 'hey', 'goodbye', 'yo', 'yes'])


def print_upper_words2(words):
    """Given list of words, print words in uppercase on a new line,
    if the word starts with E or e.

    For example:
      print_upper_words2(['echo', 'hey', 'goodbye', 'Eat', 'yes'])

    Should print:
      'ECHO'
      'EAT'
    """

    for word in words:
        if(word.startswith('e') or word.startswith('E')):
            print(word.upper())

print_upper_words2(['echo', 'hey', 'goodbye', 'Eat', 'yes'])


def print_upper_words3(words, must_start_with):
    """Given list of words, print words in uppercase on a new line,
    if the word starts with specific letters.

    For example:
      print_upper_words3(['echo', 'hey', 'goodbye', 'Eat', 'yes'], must_start_with=['e', 'g'])

    Should print:
      'ECHO'
      'EAT'
      'GOODBYE'
    """

    for word in words:
        for char in must_start_with:
            if(word.startswith(char)):
                print(word.upper())

print_upper_words3(['echo', 'hey', 'goodbye', 'Eat', 'yes'], must_start_with=['e', 'g'])
