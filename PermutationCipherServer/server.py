from http.server import SimpleHTTPRequestHandler
import socketserver
import json
from PermutationCipherServer.crypto import permutation_encrypt
import os

def start_server(port, static_files_dir):

    # Serve static files from another dir (https://stackoverflow.com/a/39801780/1657101)
    os.chdir(static_files_dir)

    allowed_origin = 'http://localhost:3000'

    class CipherHttpRequestHandler(SimpleHTTPRequestHandler):
        def handleEncryptPassword(self):
            body_string = self.rfile.read(int(self.headers['Content-Length']))
            body = json.loads(body_string)
            encrypted_password = permutation_encrypt(body['password'], body['encryptionKey'])

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', allowed_origin)
            self.end_headers()

            self.wfile.write(bytes(json.dumps(encrypted_password), 'utf8'))

            return

        def do_POST(self):
            if self.path == '/encrypt-password':
                return self.handleEncryptPassword()

        # Enable CORS for local development with webpack dev server.
        # Not sure about security :)
        def do_OPTIONS(self):
            self.send_response(200, 'ok')
            self.send_header('Access-Control-Allow-Origin', allowed_origin)
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'X-Requested-With')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

    httpRequestHandler = CipherHttpRequestHandler

    server = socketserver.TCPServer(('', port), httpRequestHandler)
    print(f'Server is running at port {port}')
    server.serve_forever()
