# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
journeys = Journeys.create([{ name: 'GGPark', origin: 414 Brannan St, destination: Golden Gate Park}, 
  { name: 'Edgewood', origin: 200 Embarcadero, destination: 218 Edgewood Ave }, 
  { name: 'Beach', origin: 218 Edgewood, destination: Ocean Beach } ])