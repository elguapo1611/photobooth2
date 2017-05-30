class Photo < ApplicationRecord
  require 'gphoto2'

  PHOTO_PATH = './public/photos'
  def self.take_photo
    file = camera.capture
    photo = create
    file.save("./public/photos/#{photo.id}.jpg")
    sleep(0.5)
  end

  def as_json(*args)
    {
      id: id,
      url: "http://localhost:3001/photos/#{id}.jpg"
    }
  end

  def self.next_id
    (Photo.maximum(:id) || 0) + 1
  end

  def self.camera
    @camera ||= GPhoto2::Camera.first
  end
end
