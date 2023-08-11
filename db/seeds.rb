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
  Reservation.destroy_all
  Review.destroy_all
  User.destroy_all
  LessonDate.destroy_all
  Lesson.destroy_all
  Location.destroy_all

  # puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('reservations')
  ApplicationRecord.connection.reset_pk_sequence!('reviews')
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('lesson_dates')
  ApplicationRecord.connection.reset_pk_sequence!('lessons')
  ApplicationRecord.connection.reset_pk_sequence!('locations')

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
  #user 5
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
  #user 10
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
  #user 12
  User.create!(
    username: 'iamstick', 
    email: 'iamstick@roshar.io', 
    password: 'stickforever'
  )

  User.create!(
    username: 'hoid', 
    email: 'hoid@everywhere.io', 
    password: 'password'
  )

  User.create!(
    username: 'shadesmar_queen', 
    email: 'shady@roshar.io', 
    password: 'password'
  )
  #user 15
  User.create!(
    username: 'thunderclasts', 
    email: 'thunderclasts@roshar.io', 
    password: 'password'
  )

  User.create!(
    username: 'lonely_listener', 
    email: 'lonely@roshar.io', 
    password: 'password'
  )

  User.create!(
    username: 'amazing_venli', 
    email: 'venli@roshar.io', 
    password: 'password'
  )

  User.create!(
    username: 'the_old_magic', 
    email: 'oldmagic@roshar.io', 
    password: 'password'
  )

  User.create!(
    username: 'OG_knights_radiant', 
    email: 'radiant@roshar.io', 
    password: 'password'
  )
  #user 20
  User.create!(
    username: 'todium', 
    email: 'todium@roshar.io', 
    password: 'password'
  )

  User.create!(
    username: 'shard16', 
    email: 'shard16@roshar.io', 
    password: 'password'
  )

  User.create!(
    username: 'blackthorn', 
    email: 'dalinar@roshar.io', 
    password: 'password'
  )

  User.create!(
    username: 'thescarredone', 
    email: 'scars@scadrial.io', 
    password: 'password'
  )

  User.create!(
    username: 'ascendantwarrior', 
    email: 'vin@scadrial.io', 
    password: 'password'
  )
  #user 25
  User.create!(
    username: 'the_diagram', 
    email: 'diagram@roshar.io', 
    password: 'password'
  )

  20.times do 
    User.create!(
      username: Faker::Internet.username(specifier: 5..10),
      email: Faker::Internet.email,
      password: 'password'
    )
  end

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

  # lesson 1
  Lesson.create!({
    title: 'Brass Soothing',
    lesson_type: 'Allomancy',
    description: 'Give the gift of peace and tranquilty. Learn to selectively diminish desired emotions.',
    location_id: 1,
    max_capacity: 6
  })
  # lesson 2
  Lesson.create!({
    title: 'Ironpulling',
    lesson_type: 'Allomancy',
    description: 'Become a lurcher and learn to pull on nearby metals. Effective in deflecting coinshots and other projectiles.',
    location_id: 1,
    max_capacity: 6
  })
  # lesson 3
  Lesson.create!({
    title: 'Pewterarm Fundamentals',
    lesson_type: 'Allomancy',
    description: 'Cover the fundamentals of how and when to best utilize pewter, and how to reduce pewter drag.',
    location_id: 1,
    max_capacity: 10
  })
  # lesson 4
  Lesson.create!({
    title: 'Steelpushing',
    lesson_type: 'Allomancy',
    description: 'Become a coinshot and learn to push away nearby metals, and how to effecively use steelpushing to fly. 
    Learn how to burn steel to identify and locate nearby sources of metal.',
    location_id: 1,
    max_capacity: 6
  })
  # lesson 5
  Lesson.create!({
    title: 'Tineye Foundations',
    lesson_type: 'Allomancy',
    description: "Practice utilizing burning tin to enhance senses. Learn how to filter out the noise you don't want and 
    how to endure heightened sensory inputs.",
    location_id: 1,
    max_capacity: 6
  })
  # lesson 6
  Lesson.create!({
    title: 'Zinc Rioting',
    lesson_type: 'Allomancy',
    description: 'Learn to enflame the emotions of a group and understand and manipulate crowd psychology and dynamics.',
    location_id: 1,
    max_capacity: 6
  })
  # lesson 7
  Lesson.create!({
    title: 'Awakening with Breath',
    lesson_type: 'Awakening',
    description: 'Use biochromatic breath to awaken inanimate objects to do your bidding.',
    location_id: 2,
    max_capacity: 6
  })
  # lesson 8
  Lesson.create!({
    title: 'Feruchemy Fundamentals',
    lesson_type: 'Feruchemy',
    description: 'Master the use of metalminds and application of the feruchemical arts such as storing weight, speed, 
    sense, strength, and health. Know when to store and when to tap into metalminds.',
    location_id: 6,
    max_capacity: 8
  })
  # lesson 9
  Lesson.create!({
    title: 'Elsecalling Advanced Transformation',
    lesson_type: 'Surgebinding',
    description: 'Learn to soulcast objects into new materials not of the ten essences. Prerequisite: Student must first master 
    soulcasting into the ten essences.',
    location_id: 3,
    max_capacity: 4
  })
  # lesson 10
  Lesson.create!({
    title: 'Elsecalling Advanced Transportation',
    lesson_type: 'Surgebinding',
    description: 'Now that you can ceate a miniature perpendicularity in order to enter the Cognitive Realm, learn to leave the Cognitive 
    Realm without seeking a perpendicularity. This will grant you the power to worldhop.',
    location_id: 3,
    max_capacity: 1
  })
  # lesson 11 
  Lesson.create!({
    title: 'Lightweaving Advanced Illumination',
    lesson_type: 'Surgebinding',
    description: 'Learn to apply illusions to moving targets and create illusions that have their own movements and sounds.',
    location_id: 3,
    max_capacity: 10
  })
  # lesson 12
  Lesson.create!({
    title: 'Lightweaving Illumination Disguises',
    lesson_type: 'Surgebinding',
    description: 'Apply illumination to create compelling and realistic disguises.',
    location_id: 3,
    max_capacity: 15
  })
  # lesson 13
  Lesson.create!({
    title: 'Stonewarding Tension',
    lesson_type: 'Surgebinding',
    description: 'Use tension to alter the hardness of an object. Create weapons from clothing and other innocent materials.',
    location_id: 4,
    max_capacity: 10
  })
  # lesson 14
  Lesson.create!({
    title: 'Willshaping Cohesion',
    lesson_type: 'Surgebinding',
    description: 'Manipulate stone at a molecular level such that you can make stone malleable like clay or liquid and reshape 
    stone at will. Learn to create openings and tunnels within stone and reseal them.',
    location_id: 4,
    max_capacity: 10
  })
  # lesson 15
  Lesson.create!({
    title: 'Bronze Seeking',
    lesson_type: 'Allomancy',
    description: 'Finess your seeking abilities to identify which metal a nearby allomancer is burning, whether they are pushing 
    or pulling, if they are flaring or if they are low on metals.',
    location_id: 5,
    max_capacity: 6
  })
  # lesson 16
  Lesson.create!({
    title: 'Copper Smoking',
    lesson_type: 'Allomancy',
    description: "Hide your friends' and allies' allomantic pulses from enemies. Learn how to best place yourself and how to discover the limits of your copper cloud.",
    location_id: 5,
    max_capacity: 6
  })
  # lesson 17 
  Lesson.create!({
    title: 'Skybreaking Gravitation',
    lesson_type: 'Surgebinding',
    description: 'Master the basic Lashing. Bind people, objects and yourself to different surfaces or in different directions, effectively changing the direction that 
    gravity pulls them. Learn to fly.',
    location_id: 8,
    max_capacity: 15
  })
  # lesson 18 
  Lesson.create!({
    title: 'Truthwatching Future Sight',
    lesson_type: 'Surgebinding',
    description: 'Learn to harness the power of your future sight and correctly interpret visions of past and future events.',
    location_id: 8,
    max_capacity: 6
  })
  # lesson 19 
  Lesson.create!({
    title: 'Edgedancing Abrasion',
    lesson_type: 'Surgebinding',
    description: 'Hone your abrasion abilities such that you can ride the thinnest rope at speed, dance across rooftops, and move through a battlefield like a ribbon on the wind.',
    location_id: 7,
    max_capacity: 10
  })
  # lesson 20 
  Lesson.create!({
    title: 'Edgedancing Regrowth',
    lesson_type: 'Surgebinding',
    description: 'Use progression or regrowth to heal even wounds suffered from Shardblades.',
    location_id: 7,
    max_capacity: 8
  })
  # lesson 21
  Lesson.create!({
    title: 'Bondsmith Spiritual Adhesion',
    lesson_type: 'Surgebinding',
    description: 'Develop your Spiritual Adhesion abilities so that you may forge a connection to a target person in order to speak their native language.',
    location_id: 9,
    max_capacity: 1
  })
  # lesson 22
  Lesson.create!({
    title: 'Dustbringing Division',
    lesson_type: 'Surgebinding',
    description: 'Learn to bring total control and precision to your division such that you can reproduce a topigraphical map "carved" into a wooden table.',
    location_id: 9,
    max_capacity: 10
  })
  # lesson 23
  Lesson.create!({
    title: 'Fabrial Crafting',
    lesson_type: 'Stormlight',
    description: 'Learn modern fabrial crafting foundational techniques, such as luring spren, trapping spren in gemstones, gemstone selection, and the Arnist Method.',
    location_id: 9,
    max_capacity: 12
  })
  # lesson 24
  Lesson.create!({
    title: 'Windrunning Adhesion',
    lesson_type: 'Surgebinding',
    description: 'Practice the full lashing to pool Stormlight into objects and areas to strategically bond items and hinder movement.',
    location_id: 9,
    max_capacity: 12
  })
  # lesson 25
  Lesson.create!({
    title: 'Windrunning Advanced Aerial Tactics',
    lesson_type: 'Surgebinding',
    description: 'Advanced flight formations and battle tactics for aerial combat with shardspear.',
    location_id: 9,
    max_capacity: 20
  })

  now = DateTime.now()
  Lesson.all.each do |lesson|
    
    start_time_fixed = DateTime.new(2023, 8, 1, rand(1..12), 0, 0, '-8')
    start_time = DateTime.new(now.year, now.month, now.day, rand(1..12), 0, 0, '-8')
    # length = [1, 1.5, 2].sample
    length = 1
    end_time = start_time + length.hour
    end_time_fixed = start_time_fixed + length.hour
    
    10.times do
      num = rand(1..5)
      LessonDate.create!({
        lesson_id: lesson.id,
        start_time: start_time_fixed + num.day,
        end_time: end_time_fixed + num.day
      })
      
      start_time_fixed = start_time_fixed + 5.day
      end_time_fixed = end_time_fixed + 5.day
      
    end

    10.times do
      num = rand(1..10)
      LessonDate.create!({
        lesson_id: lesson.id,
        start_time: start_time + num.day,
        end_time: end_time + num.day
      })

      start_time = start_time + 4.day
      end_time = end_time + 4.day

    end

  end
  
  

  sample_lesson_dates = LessonDate.all.sample(30)
  student_id_range_max = User.all.length
  sample_lesson_dates.each do |lesson_date|
    Reservation.create!({
      student_id: 2,
      lesson_date_id: lesson_date.id,
    })

    Reservation.create!({
      student_id: rand(3..student_id_range_max),
      lesson_date_id: lesson_date.id,
    })
  end 

  
  

  Location.all.each do |location|
    location_name = location.location_name

    if location.location_name.include?(" ")
      location_name = location.location_name.split(" ").join("_") 
    end 
    
    
    location.photo.attach(
      # The string passed to URI.open should be the URL of the image in its bucket.
      # This sample assumes the bucket name is `benchbnb-seeds`.
      io: URI.open("https://cosmere-pass-seeds.s3.us-west-1.amazonaws.com/#{location_name}.jpeg"), 
      filename: "#{location_name}.jpeg"
    )
  end


  Lesson.all.each do |lesson|
    title = lesson.title

    if lesson.title.include?(" ")
      title = lesson.title.split(" ").join("_") 
    end 
    
    
    lesson.photo.attach(
      # The string passed to URI.open should be the URL of the image in its bucket.
      # This sample assumes the bucket name is `benchbnb-seeds`.
      io: URI.open("https://cosmere-pass-seeds.s3.us-west-1.amazonaws.com/#{title}.jpeg"), 
      filename: "#{title}.jpeg"
    )
  end

  sample_review_body = ["Amazing lesson! I can't wait to take more!", "Wow, that was great, I learned so much.", "Learned so much!", "I enjoyed it :)", "Great! Will be back!", "I love this!", "Quality instructors and material."]


  users = User.all.drop(2)
  users.each do |user|
    Lesson.all.each do |lesson|
      Review.create!({
        lesson_id: lesson.id,
        reviewer_id: user.id,
        rating: rand(3..5),
        body: sample_review_body.sample,
        location_id: lesson.location_id
      })
    end
  end



  # puts "Done!"
# end