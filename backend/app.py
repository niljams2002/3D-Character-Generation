from os import environ
from dotenv import load_dotenv
from os.path import join, abspath
from utils.factory import create_app

dotenv_path = join(abspath(join('.env')))
load_dotenv(dotenv_path)
app = create_app()
PORT = environ.get('PORT') or 5000

if __name__ == "__main__":
    app.run(port=PORT)
