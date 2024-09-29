import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import difflib
import re

app = Flask(__name__)
CORS(app)

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False
        self.term = None

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word, term):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
        node.term = term

    def search_prefix(self, prefix, max_results=5):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return []
            node = node.children[char]
        
        results = []
        self._dfs(node, prefix, results, max_results)
        return results

    def _dfs(self, node, current_prefix, results, max_results):
        if len(results) >= max_results:
            return

        if node.is_end:
            results.append(node.term)

        for char, child_node in node.children.items():
            self._dfs(child_node, current_prefix + char, results, max_results)

def load_slang_database():
    with open('slang_database.json', 'r') as file:
        data = json.load(file)
    return {term.lower(): (definition, generation) for generation, terms in data.items() for term, definition in terms.items()}

slang_database = load_slang_database()
trie = Trie()

# Create a reverse lookup dictionary for quick definition access
reverse_lookup = {}

for term, (definition, generation) in slang_database.items():
    trie.insert(term.lower(), term)
    reverse_lookup[term.lower()] = (definition, generation)

def identify_slang(term):
    best_match = None
    best_ratio = 0
    for slang in slang_database.keys():
        ratio = difflib.SequenceMatcher(None, term.lower(), slang).ratio()
        if ratio > best_ratio and ratio > 0.8:  # Increased threshold for sentence translation
            best_ratio = ratio
            best_match = slang
    return best_match

def translate_sentence(sentence):
    words = re.findall(r'\b\w+\b|\S+', sentence.lower())
    translated_words = []
    slang_translations = {}
    for word in words:
        if word in slang_database:
            definition, generation = slang_database[word]
            translated_words.append(f"{word} ({definition})")
            slang_translations[word] = {"definition": definition, "generation": generation}
        else:
            translated_words.append(word)
    return ' '.join(translated_words), slang_translations

@app.route('/translate')
def translate():
    text = request.args.get('text', '').lower()
    translated_text, slang_translations = translate_sentence(text)
    
    return jsonify({
        'original_text': text,
        'translated_text': translated_text,
        'slang_translations': slang_translations
    })

@app.route('/autocomplete')
def autocomplete():
    prefix = request.args.get('prefix', '').lower()
    suggestions = trie.search_prefix(prefix)
    return jsonify(suggestions)

