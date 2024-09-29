import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import difflib

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
        return json.load(file)

slang_database = load_slang_database()
trie = Trie()

for generation, terms in slang_database.items():
    for term in terms:
        trie.insert(term.lower(), term)

def identify_slang(term):
    best_match = None
    best_ratio = 0
    best_generation = None

    for generation, slang_dict in slang_database.items():
        for slang, definition in slang_dict.items():
            ratio = difflib.SequenceMatcher(None, term.lower(), slang.lower()).ratio()
            if ratio > best_ratio and ratio > 0.6:  # Adjust the threshold as needed
                best_ratio = ratio
                best_match = slang
                best_generation = generation

    if best_match:
        return best_generation, slang_database[best_generation][best_match], best_match
    return None, None, None

def find_equivalents(term):
    equivalents = {}
    target_gen, target_definition, matched_term = identify_slang(term)
    if target_gen:
        for gen, slang_dict in slang_database.items():
            if gen != target_gen:
                for slang, definition in slang_dict.items():
                    if definition.lower() == target_definition.lower():
                        equivalents[gen] = slang
    return equivalents, matched_term

@app.route('/translate')
def translate():
    term = request.args.get('term', '').lower()
    generation, definition, matched_term = identify_slang(term)
    if generation:
        equivalents, matched_term = find_equivalents(term)
        return jsonify({
            'term': matched_term,
            'original_term': term,
            'generation': generation,
            'definition': definition,
            'equivalents': equivalents
        })
    else:
        return jsonify({'error': 'Slang term not found in the database'}), 404

@app.route('/autocomplete')
def autocomplete():
    prefix = request.args.get('prefix', '').lower()
    suggestions = trie.search_prefix(prefix)
    return jsonify(suggestions)

