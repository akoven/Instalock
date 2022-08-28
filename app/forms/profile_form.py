from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, RadioField
from wtforms.validators import DataRequired

class ProfileEditForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])
    website = StringField("Website")
    bio = TextAreaField("Bio")
    email = StringField("Email", validators=[DataRequired()])
    phone_number = StringField("Phone Number")
    gender = RadioField("Gender")
    profile_image_url = StringField("Profile Image URL")
