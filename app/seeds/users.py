from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    # demo = User(username='Demo', email='demo@aa.io',
    #             password='password')

    # db.session.add(demo)

    # db.session.commit()

    # admin_adc = User(id=1, username='adc',
    #                  email='adc@flxp.com', password='password')
    admin_adc = User(username='adc', email='adc@flxp.com', password='password')
    test_user1 = User(username='test_user1', email='test_user1@flxp.com', password='password')
    test_user2 = User(username='test_user2', email='test_user2@flxp.com', password='password')

    db.session.add(admin_adc)
    db.session.add(test_user1)
    db.session.add(test_user2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
