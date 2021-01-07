from app.models import db, WatchList


def seed_watchlists():

    objects = [
        WatchList(
            user_id=2,
        ),
        WatchList(
            user_id=3,
        ),
    ]

    db.session.bulk_save_objects(objects)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_watchlists():
    db.session.execute('TRUNCATE watchlists;')
    db.session.commit()
