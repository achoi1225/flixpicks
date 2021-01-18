from app.models import db, Review


def seed_reviews():

    objects = [ 
        Review(
            content="One of my top ten favorites!",
            user_id=2,
            imdb_id="tt0338013",
            stars=5
        ),
        Review(
            content="Mercy is for the weak. We do not train to be merciful here. Man face you he is enemy. Enemy deserve no mercy... HONK!",
            user_id=1,
            imdb_id="tt0091326",
            stars=4
        ),
        Review(
            content="I learned all of my karate from watching this movie!",
            user_id=2,
            imdb_id="tt0091326",
            stars=5
        ),
        Review(
            content="Funniest movie ever! Still holds up!",
            user_id=3,
            imdb_id="tt0091326",
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
