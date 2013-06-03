from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker

ENGINE = None
Session = None

Base = declarative_base()

### Class declarations go here
class Pill(Base):
    __tablename__ = "pills"
    
    """Import columns from pillbox.xml."""

    id = Column(Integer, primary_key = True)
    pill_name = Column(String(64), nullable = False)
    code = Column(String(25), nullable = True)
    imprint = Column(String(15), nullable = True)
    shape = Column(String(15), nullable = True)
    color = Column(String(15), nullable = True)
    ingred1 = Column(String(100), nullable = True)
    ingred2 = Column(String(100), nullable = True)
    manufacturer = Column(String(64), nullable = True)
    image_exist  = Column(Integer, nullable = True)
    image_id = Column(String(15), nullable = True)

    

### End class declarations

def connect():
    global ENGINE
    global Session

    ENGINE = create_engine("sqlite:///pills.db", echo = True)
    Session = sessionmaker(bind = ENGINE)

    return Session()

def main():
    """Create main function just in case."""
    pass

if __name__ == "__main__":
    main()
