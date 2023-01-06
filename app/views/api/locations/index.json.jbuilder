@locations.each do |location|
  json.set! location.id do
    json.extract! location, :id, :location_name, :description
    json.imageURL location.photo.url
  end
end