from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class LikeForm(FlaskForm):
    user_id = IntegerField("User_id", validators=[DataRequired()])
    post_id = IntegerField("Post_id")
    comment_id = IntegerField("Comment_id")
