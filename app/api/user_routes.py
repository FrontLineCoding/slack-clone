from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import User, db
from ..forms.UpdateInformationForm import UpdateInformationForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>', methods=['GET', 'PUT'])
@login_required
def user(id):
    user = User.query.get(id)
    form = UpdateInformationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(request.method == 'GET'):
        """
        Query for a user by id and returns that user in a dictionary
        """
        return user.to_dict()
    if(request.method == 'PUT'):
        print('---------*************************---------',form.data)
        user.first_name=form.data['first_name']
        user.last_name=form.data['last_name']
        user.img=form.data['image']
        user.email=form.data['email']
        if(form.data['password']):
            user.password=form.data['password']
        db.session.commit()
        return user.to_dict()
