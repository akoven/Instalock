from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, PasswordField, BooleanField, TextAreaField, SelectField, DecimalField, DateField
from wtforms.validators import DataRequired
from app.models import Post
# img url, userId, caption

class CommentForm(FlaskForm):
  user_id = IntegerField("User_id", validators=[DataRequired()])
  post_id = IntegerField("Post_id", validators=[DataRequired()])
  content = StringField("Content", validators=[DataRequired()])
