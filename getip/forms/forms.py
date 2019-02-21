from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, url

class URL_Form(FlaskForm):
    url = StringField(
        None,
        [
            DataRequired(),
            url(
                require_tld=True,
                message="You must enter a valid, top-level domain URL."
            )
        ]
    )