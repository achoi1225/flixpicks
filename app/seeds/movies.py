# from werkzeug.security import generate_password_hash
from app.models import db, Movie

def seed_movies():

    test_movie = Movie(
        # id=1,
        imdb_movie_id='tt123456',
        title="THE TEST",
        image='https://nqg-images.s3.amazonaws.com/Taylor_Swift-01.png',
        description="about a capstone project gone awry",
        year=1997
    )

    karate_kid = Movie(
        # id=2,
        imdb_movie_id='tt0091326',
        title="The Karate Kid Part II",
        image='https://m.media-amazon.com/images/M/MV5BY2E3YjliMWEtYzlmOC00NmU5LWE4NGItNmIyZmNkZjkwNTA0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg',
        description="Daniel accompanies his mentor, Mr. Miyagi, to Miyagi's childhood home in Okinawa. Miyagi visits his dying father and confronts his old rival, while Daniel falls in love and inadvertently makes a new rival of his own.",
        year=1986
    )
    
    db.session.add(test_movie)
    db.session.add(karate_kid)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_movies():
    db.session.execute('TRUNCATE movies;')
    db.session.commit()
