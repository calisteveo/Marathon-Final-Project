# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
Marathon::Application.config.secret_key_base = '2fcad5d675b3fd125444ad1fcdc7ac2d40c69703786752269b52bec2949ea0b21fdafca32417d9937efce0dcdd32caf9e6bdd4a59f7f085fc99234ff28e2376f'
