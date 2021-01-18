from app.models import db, Role

def seed_roles():

    objects = [
    #   Role(
    #     imdb_id="tt123456",
    #     character="Pojo, PJ",
    #     actor="Brad Git",
    #     image="https://m.media-amazon.com/images/M/MV5BMjA1MjE2MTQ2MV5BMl5BanBnXkFtZTcwMjE5MDY0Nw@@._V1_UX214_CR0,0,214,317_AL_.jpg",
    #   ),
    #   Role(
    #       imdb_id="tt123456",
    #       character="Pip",
    #       actor="Unknown Actor",
    #       image="https://m.media-amazon.com/images/M/MV5BMTM4MDk3OTYxOF5BMl5BanBnXkFtZTcwMDk5OTUwOQ@@._V1_UY317_CR9,0,214,317_AL_.jpg",
    #   ),

      Role(
          imdb_id="tt0091326",
          character="Miyagi",
          actor="Pat Morita",
          image="https://m.media-amazon.com/images/M/MV5BODIyNzYwNjE4NV5BMl5BanBnXkFtZTcwNzA3MzQ3Mw@@._V1_UY317_CR2,0,214,317_AL_.jpg",
      ),
      Role(
          imdb_id="tt0091326",
          character="Daniel",
          actor="Ralph Macchio",
          image="https://m.media-amazon.com/images/M/MV5BMjExMjk0NTA5MF5BMl5BanBnXkFtZTcwMjM4MzU1Mw@@._V1_UY317_CR3,0,214,317_AL_.jpg"
      ),
      Role(
          imdb_id="tt0091326",
          character="Some dude",
          actor="Pat E. Johnson",
          image="https://m.media-amazon.com/images/M/MV5BNTY4ZDAyY2UtODY0Zi00ZTRhLTliN2UtZDcwZDFlMGZlZGVjXkEyXkFqcGdeQXVyMTk0ODU3MTE@._V1_UY317_CR1,0,214,317_AL_.jpg",
      ),
    ]

    db.session.bulk_save_objects(objects)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_roles():
    db.session.execute('TRUNCATE roles;')
    db.session.commit()
