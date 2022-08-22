from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class UserFollowerForm(FlaskForm):
    user_id = IntegerField("User_id", validators=[DataRequired()])
    follower_id = IntegerField("Follower_id", validators=[DataRequired()])
