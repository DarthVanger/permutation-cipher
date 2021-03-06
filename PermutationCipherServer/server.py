from http.server import SimpleHTTPRequestHandler
import socketserver
import json
import os
from .crypto import permutation_encrypt

def start_server(port, static_files_dir):

    # Serve static files from another dir (https://stackoverflow.com/a/39801780/1657101)
    os.chdir(static_files_dir)

    is_dev_environment = os.environ.get('DEVELOPMENT')
    webpack_dev_server_origin = 'http://localhost:3000'

    class CipherHttpRequestHandler(SimpleHTTPRequestHandler):
        def send_internal_error(self):
            self.send_response(500)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(bytes('Internal Server Error\n', 'utf8'))

        def send_not_found(self):
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(bytes('Not found\n', 'utf8'))

        def handleEncryptPassword(self):
            try:
                body_string = self.rfile.read(int(self.headers['Content-Length']))
                body = json.loads(body_string)
                encrypted_password = permutation_encrypt(body['password'], body['encryptionKey'])

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                if is_dev_environment:
                    self.send_header('Access-Control-Allow-Origin', webpack_dev_server_origin)
                self.end_headers()

                self.wfile.write(bytes(json.dumps(encrypted_password), 'utf8'))

            except Exception:
                self.send_internal_error()

        def do_POST(self):
            if self.path == '/encrypt-password':
                return self.handleEncryptPassword()

            self.send_not_found()

        # Enable CORS for local development with webpack dev server.
        def do_OPTIONS(self):
            if not is_dev_environment:
                return self.send_internal_error

            self.send_response(200, 'ok')
            self.send_header('Access-Control-Allow-Origin', webpack_dev_server_origin)
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'X-Requested-With')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

    httpRequestHandler = CipherHttpRequestHandler

    server = socketserver.TCPServer(('', port), httpRequestHandler)
    print(f'Server is running at port {port}')
    server.serve_forever()
