# from werkzeug.security import generate_password_hash
from app.models import db, Trailer


def seed_trailers():

    trailer0 = Trailer(
        imdb_id='tt0338013',
        trailer_id='vi2292515097',
    )

    trailer1 = Trailer(
        imdb_id='tt0091326',
        trailer_id='vi68731161',
    )

    db.session.add(trailer0)
    db.session.add(trailer1)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_trailers():
    db.session.execute('TRUNCATE trailers;')
    db.session.commit()
