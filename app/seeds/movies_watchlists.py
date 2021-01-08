from app.models import db, Movie, WatchList


def seed_watchlist():
    movies = Movie.query.filter(Movie.id.in_([1,2])).all()
    watchlist = WatchList(
        user_id = 1
    )
    watchlist.movies = movies

    db.session.add(watchlist)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_watchlist():
    db.session.execute('TRUNCATE watchlist;')
    db.session.commit()
