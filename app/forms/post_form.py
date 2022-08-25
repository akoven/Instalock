from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired

# img url, userId, caption

class PostForm(FlaskForm):
  user_id = IntegerField("User_id", validators=[DataRequired()])
  image_url = StringField("Image_url", validators=[DataRequired()])
  caption = StringField("Caption", validators=[DataRequired()])
  display_comments = BooleanField("Display comments")
