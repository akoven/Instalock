from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, PasswordField, BooleanField, TextAreaField, SelectField, DecimalField, DateField
from wtforms.validators import DataRequired
from app.models import Post
# img url, userId, caption

class PostForm(FlaskForm):
  user_id = IntegerField("User_id", validators=[DataRequired()])
  image_url = StringField("Image_url", validators=[DataRequired()])
  caption = StringField("Caption", validators=[DataRequired()])
