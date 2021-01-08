from app import models
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .movies import seed_movies, undo_movies
from .reviews import seed_reviews, undo_reviews
from .roles import seed_roles, undo_roles
from .movies_watchlists import seed_watchlist, undo_watchlist
from app.models import db

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_movies()
    seed_reviews()
    seed_roles()
    seed_watchlist()
    # seed_annotations()

    #set the search vectors for Songs
    # songs = Song.query.all()
    # for song in songs:
    #     song.create_tsvector()

    # db.session.bulk_save_objects(songs)
    # db.session.commit()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_movies()
    undo_reviews()
    undo_roles()
    undo_watchlist()
    # undo_annotations()
    # Add other undo functions here
