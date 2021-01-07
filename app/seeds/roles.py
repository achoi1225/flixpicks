from app.models import db, Role

def seed_roles():

    objects = [
      Role(
        movie_id=1,
        character="Pojo, PJ",
        actor="Brad Git",
      ),
      Role(
          movie_id=1,
          character="Pip",
          actor="Unknown Actor",
      ),

      Role(
          movie_id=2,
          character="Miyagi",
          actor="Pat Morita",
      ),
      Role(
          movie_id=2,
          character="Daniel",
          actor="Ralph Macchio",
      ),
      Role(
          movie_id=2,
          character="Some dude",
          actor="Pat E. Johnson",
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
