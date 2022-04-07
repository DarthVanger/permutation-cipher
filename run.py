import os
from PermutationCipherServer.server import start_server

static_files_dir = os.path.join(os.path.dirname(__file__), 'build')
port = int(os.environ.get('PORT', 8000))

start_server(port, static_files_dir)
