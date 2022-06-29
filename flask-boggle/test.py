from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):
        """Basic setup"""

        self.client = app.test_client()
        app.testing = True

        with self.client as client:
            with client.session_transaction() as session:
                session['board'] = [["D", "E", "E", "E", "Z"],
                                    ["D", "E", "E", "E", "Z"],
                                    ["D", "E", "E", "E", "Z"],
                                    ["D", "E", "E", "E", "Z"],
                                    ["D", "E", "E", "E", "Z"]]


    def test_board(self):
        """Make sure the page has been rendered properly"""
        
        with self.client:
            res = self.client.get('/')
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('plays'))
            self.assertIn(b'High Score:', res.data)
            self.assertIn(b'Score:', res.data)
            self.assertIn(b'Time Left:', res.data)
            self.assertIn(b'<td>D</td>', res.data)
            self.assertIn(b'<td>E</td>', res.data)
            self.assertIn(b'<td>Z</td>', res.data)


    def test_valid_words(self):
        """Check if the word is valid on the board"""
        
        with self.client:
            res = self.client.post('/check', json={'word':'deed'}, content_type='application/json')
            self.assertEqual(res.json['result'], 'ok')


    def test_invalid_words(self):
        """Check that the word is NOT on the board"""
        
        with self.client:
            res = self.client.post('/check', json={'word':'doom'}, content_type='application/json')
            self.assertEqual(res.json['result'], 'not-on-board')

    def test_dict_words(self):
        """Check if the word exists in the dictionary"""
        
        with self.client:
            res = self.client.post('/check', json={'word':'zzggskkjsw'}, content_type='application/json')
            self.assertEqual(res.json['result'], 'not-word')
