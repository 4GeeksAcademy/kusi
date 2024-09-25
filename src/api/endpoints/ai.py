import json
import os

from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restx import fields, Resource
from openai import OpenAI

from api.models import Dish, Role, RoleName
from api.namespaces import ai_namespace
from api.utils import InvalidAPIUsage

bcrypt = Bcrypt()

chat_message = ai_namespace.model(
    "ChatMessage",
    {
        "role": fields.String,
        "content": fields.String
    }
)

chat = ai_namespace.model(
    "Chat",
    {
        "messages": fields.List(fields.Nested(chat_message)),
    }
)

openai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@ai_namespace.response(200, "OK")
@ai_namespace.response(403, "Forbidden")
@ai_namespace.response(500, "Internal server error")
@ai_namespace.route("/")
class AI(Resource):
    @jwt_required()
    @ai_namespace.doc(security="jsonWebToken")
    @ai_namespace.doc("AI")
    @ai_namespace.expect(chat)
    def post(self):
        """Creates a response for client message."""
        current_user = get_jwt_identity()
        client_role = Role.query.filter_by(name=RoleName.CLIENT.value).one_or_none()
        if current_user["role_id"] != client_role.id:
            raise InvalidAPIUsage("Only clients can use Kusi AI", 403)
        dishes = list(map(lambda dish: dish.serialize(), Dish.query.all()))
        # TODO: Add order of current user
        payload = ai_namespace.payload
        prompt = f"""
        <role>
            You are a top waiter in a high-end restaurant in the US that fluently speaks Spanish.
            Your name is Kusi AI, the chatbot of this Peruvian restaurant.
        </role>
        <kusi>
            - Password recovery in landing page.
            - Menu is a table of dish cards, and you can add them to your cart.
            - Before proceeding to checkout, you can add special instructions to the order.
            - You can pay with Paypal. Stripe and visa soon.
            - You can view the status of the orders.
            - You can update your profile.
        </kusi>
        <filter>
            Clients can only ask about the following: app features, order details or gastronomy information. Otherwise, do not answer politely.
        </filter>
        <data>
            - Dishes: {dishes}.
        </data>
        <request>
            {payload["messages"][-1]["content"]}
        </request>
        """
        payload["messages"][-1]["content"] = prompt
        response = openai_client.chat.completions.create(
            model=os.environ.get("OPENAI_MODEL"),
            messages=payload["messages"]
        )
        message = response.choices[0].message
        return { "role": message.role, "content": message.content }, 200
