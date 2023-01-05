# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"

# ApplicationRecord.transaction do 
  # puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Location.destroy_all
  Lesson.destroy_all

  # puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('locations')
  ApplicationRecord.connection.reset_pk_sequence!('lessons')

  # puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  User.create!(
    username: 'worldhopper', 
    email: 'world@hopper.io', 
    password: 'password'
  )

  User.create!(
    username: 'windrunner_squire01', 
    email: 'windy@roshar.io', 
    password: 'password'
  )

  User.create!(
    username: 'stormlight_forever', 
    email: 'storms@roshar.io', 
    password: 'password'
  )

  User.create!(
    username: 'leshwi', 
    email: 'flyinggoddess@roshar.io', 
    password: 'password'
  )

  User.create!(
    username: 'dabbid', 
    email: 'dabbid@roshar.io', 
    password: 'password'
  )

  User.create!(
    username: 'ryshadium_lover', 
    email: 'adolin@roshar.io', 
    password: 'password'
  )

  User.create!(
    username: 'rustnruin', 
    email: 'rusts@scadrial.io', 
    password: 'password'
  )

  User.create!(
    username: 'theroughs4ever', 
    email: 'wax@scadrial.io', 
    password: 'password'
  )

  User.create!(
    username: 'wayyyne', 
    email: 'wayne@scadrial.io', 
    password: 'password'
  )

  User.create!(
    username: 'thoughtful_terrisman82', 
    email: 'terris_me@scadrial.io', 
    password: 'password'
  )

  User.create!(
    username: 'iamstick', 
    email: 'iamstick@roshar.io', 
    password: 'stickforever'
  )


  #creating locations
  Location.create!({
    location_name: 'Elendel',
    description: 'Elendel is the largest city in the Elendel Basin on Scadrial and 
    in the cosmere at large. It is located at the mouth of the Irongate river where 
    it flows into Hammondar Bay.'
  })

  # location_1.photo.attach(io: URI.open("https://cosmere-pass-seeds.s3.us-west-1.amazonaws.com/Elendel.jpeg"), filename: "elendel.jpg")

  Location.create!({
    location_name: 'Hallandren',
    description: "Hallandren is the most powerful kingdom on Nalthis. Its capital is T'Telir. 
    It is unique for its jungle environment and the Tears of Edgli, which grow nowhere else. 
    It is home to the Hallandren Iridescent Tones, the religion that supports and is led by 
    the Returned."
  })

  # location_2.photo.attach(io: URI.open("https://cosmere-pass-seeds.s3.us-west-1.amazonaws.com/Hallandren.jpeg"), filename: "hallandren.jpg")

  Location.create!({
    location_name: 'Kharbranth',
    description: "Kharbranth, the City of Bells, is an independent city-state on Roshar, ruled by 
    Queen Savrahalidem. It is one of the five Vorin nations and home to the Palanaeum, the largest 
    library on Roshar. Kharbranth is known for the quality of its hospitals, and people come from 
    all over the world to study medicine from Kharbranth's surgeons."
  })

  Location.create!({
    location_name: 'Kholinar',
    description: "Kholinar is the capital city of the Kholin princedom in Alethkar, Roshar. It's 
    symmetrical in shape, built around enormous stone formations known as the windblades for their 
    unmistakable shape."
  })

  Location.create!({
    location_name: 'Luthadel',
    description: "Luthadel is the capital city of the Final Empire on Scadrial. Located in the center 
    of the Central Dominance, Luthadel is the cultural and political center of the Final Empire."
  })

  Location.create!({
    location_name: 'Homeland',
    description: "The Homeland is the secret, underground nation of the kandra on Scadrial during the 
    Final Empire. It is located in the same mountain range as the Arguois caverns and the Pits of Hathsin, 
    in fact many of its tunnels connected to the latter and had to be kept blocked and guarded."
  })

  Location.create!({
    location_name: 'Thaylen City',
    description: "Thaylen City is the capital of Thaylenah on Roshar. Thaylen City is located on the 
    northwestern coast of the largest of the islands forming Thaylenah. It sits on the shores of Longbrow's 
    Straits, a strip of ocean dividing Thaylenah from the Rosharan mainland. The city was built inside a 
    massive natural lait to protect it from highstorms. It's also surrounded by mountains, offering 
    additional protection."
  })

  Location.create!({
    location_name: 'Purelake',
    description: "The Purelake is a shallow inland lake that is hundreds of miles wide and located in north 
    central Roshar. The waters of the Purelake are warm and crystal-clear, and the surface typically calm and 
    smooth despite the tides. The lake has an average depth of about midcalf, though at some spots it reaches 
    depths of around six feet.The people of the region are known as Purelakers and are ethnically Selay."
  })

  Location.create!({
    location_name: 'Urithiru',
    description: "Urithiru is a tower-city on Roshar that functioned as the home of the Knights Radiant and the 
    central point of the Silver Kingdoms during the Heraldic Epochs. In the present day, it serves as the 
    headquarters of the forces opposing Odium, including the coalition of monarchs, the refounded Knights Radiant, 
    and the remaining Alethi soldiers and nobility."
  })



  Location.each_with_index do |location|
    location_name = location.location_name

    if location.location_name.include?(" ")
      location_name = location.location_name.split(" ").join("_") 
    end 

    location.photo.attach(
      # The string passed to URI.open should be the URL of the image in its bucket.
      # This sample assumes the bucket name is `benchbnb-seeds`.
      io: URI.open("https://cosmere-pass-seeds.s3.us-west-1.amazonaws.com/#{location_name}.jpg"), 
      filename: "#{location_name}.jpg"
    )
  end



  # puts "Done!"
# end