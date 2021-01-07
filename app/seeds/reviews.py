from app.models import db, Review


def seed_reviews():

    objects = [ 
        Review(
            content="Was this supposed to be a movie?",
            user_id=2,
            movie_id=1,
            stars=1
        ),
        Review(
            content="Funniest movie ever! Still holds up!",
            user_id=3,
            movie_id=2,
            stars=5
        ),
    ]

    db.session.bulk_save_objects(objects)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_reviews():
    db.session.execute('TRUNCATE reviews;')
    db.session.commit()
