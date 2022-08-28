from flask import Blueprint, request, jsonify, render_template
from helpers import token_required
from models import db, User, Recipe, recipe_schema, recipes_schema

api = Blueprint('meals',__name__, url_prefix='https://www.themealdb.com/api/json/v1/1/')



@api.route('random.php', methods= ['GET'])
@token_required
def get_meals(current_user_token):
    a_user = current_user_token.token
    response = recipes_schema.dump(recipes)
    return jsonify(response)

@api.route('/recipes/<id>', methods= ['GET'])
@token_required
def get_single_recipe(current_user_token, id):
    recipe = Recipe.query.get(id)
    response = recipe_schema.dump(recipe)
    return jsonify(response)

