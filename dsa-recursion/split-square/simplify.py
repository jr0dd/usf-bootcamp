"""Simplify a split square:

A simple square is already simplified::

    >>> simplify(0)
    0

A split square containing four simple filled squares can be
simplified to a simple filled square::

    >>> simplify([1, 1, 1, 1])
    1

A split square containing four simple empty squares can be
simplified to a simple empty square::

    >>> simplify([0, 0, 0, 0])
    0

A split square containing mixed squares cannot be simplified::

    >>> simplify([1, 0, 1, 0])
    [1, 0, 1, 0]

These can be simplified even when nested::

    >>> simplify([1, 0, 1, [1, 1, 1, 1]])
    [1, 0, 1, 1]

Simplification should nest, so if we can simplify one split square
into a simple square and now an outer split square can be
simplified, it should::

    >>> simplify([1, 1, 1, [1, 1, 1, 1]])
    1

    >>> simplify([[1, 1, 1, 1], [1, 1, 1, 1], 1, 1])
    1

    >>> simplify([1, 0, [1, [0, 0, 0, 0], 1, [1, 1, 1, 1]], 1])
    [1, 0, [1, 0, 1, 1], 1]

Be careful that we don't "simplify" a set of matching mixed squares:

    >>> simplify([[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]])
    [[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]]
"""


def simplify(s):
    """Simplify a split square:"""


if __name__ == "__main__":
    import doctest
    if doctest.testmod().failed == 0:
        print "\n*** ALL TESTS PASS; YOU MADE THAT SEEM SIMPLE!!\n"
