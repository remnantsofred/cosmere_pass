@locations.each do |location|
  json.set! location.id do
    json.extract! location, :id, :location_name, :description
    json.imageUrls location.images.map {|file| file.url } 
  end
end