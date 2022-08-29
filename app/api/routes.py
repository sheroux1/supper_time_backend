from flask import Blueprint, request, jsonify, render_template,  redirect, url_for, flash, make_response
from helpers import token_required
from models import db, User, Recipe, recipe_schema, recipes_schema
import requests

api = Blueprint('api',__name__, url_prefix='/api')

@api.route('/recipes', methods= ['POST'])
@token_required
def store_recipe(current_user_token):
    recipe_name = request.json['recipe_name']
    api_id = request.json['api_id']
    user_token = current_user_token.token

    print(f'Current token: {current_user_token.token}')

    recipe = Recipe(recipe_name, api_id, user_token=user_token)

    db.session.add(recipe)
    db.session.commit()

    response = recipe_schema.dump(recipe)
    return jsonify(response)

@api.route('/addrecipe/<id>', methods=['POST'])
@token_required
def addrecipe(current_user_token, **kwargs):
    api_id  = kwargs.get('id')
    # print("LOOOK AT MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
    meals = requests.get(url="https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + api_id)
    x = meals.json()
    # print("THE TYPE OF THE X OBJECT IS..........................")
    # print(x['meals'][0]['strMeal'])
    # recipe_name = x.meals[0].strMeal
    recipe_name = x['meals'][0]['strMeal']
    user_token = current_user_token.token
    recipe = Recipe(recipe_name, api_id, user_token=user_token)
    db.session.add(recipe)
    db.session.commit()

    return jsonify(recipe_schema.dump(recipe))

@api.route('/recipes', methods= ['GET'])
@token_required
def get_recipes(current_user_token):
    a_user = current_user_token.token
    recipes = Recipe.query.filter_by(user_token = a_user).all()
    response = recipes_schema.dump(recipes)
    return jsonify(response)

@api.route('/recipes/<id>', methods= ['GET'])
@token_required
def get_single_recipe(current_user_token, id):
    recipe = Recipe.query.get(id)
    response = recipe_schema.dump(recipe)
    return jsonify(response)

@api.route('/recipes/<id>', methods= ['POST', 'PUT'])
@token_required
def update_recipe(current_user_token, id):
    recipe = Recipe.query.get(id)
    recipe.recipe_name = request.json['recipe_name']
    recipe.api_id = request.json['api_id']
    recipe.user_token = current_user_token.token

    db.session.commit()
    response = recipe_schema.dump(recipe)
    return jsonify(response)

@api.route('/recipes/<id>', methods= ['DELETE'])
@token_required
def delete_recipe(current_user_token, id):
    recipe = Recipe.query.get(id)
    db.session.delete(recipe)
    db.session.commit()
    response = recipe_schema.dump(recipe)
    return jsonify(response)
