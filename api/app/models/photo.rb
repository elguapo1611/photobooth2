class Photo < ApplicationRecord
  require 'gphoto2'

  PHOTO_PATH = './public/photos'
  def self.take_photo
    file = begin
      camera.capture
    rescue Gphoto2::Error
      @camera = nil
      camera.capture
    end
    photo = create
    file.save("./public/photos/#{photo.id}.jpg")
    sleep(0.1)
    puts("output resized photo")
    File.open("#{Rails.root}/public/photos/#{photo.id}.jpg", "r") do |f|
      FastImage.resize(f, 2048, 1365, outfile: "#{Rails.root}/public/photos/#{photo.id}_med.jpg")
    end
    puts("finished output resized photo")
    sleep(0.4)
  end

  def as_json(*args)
    {
      id: id,
      url: "http://localhost:3001/photos/#{id}_med.jpg"
    }
  end

  def self.next_id
    (Photo.maximum(:id) || 0) + 1
  end

  def self.camera
    @camera ||= GPhoto2::Camera.first
  end
end
