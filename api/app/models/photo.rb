class Photo < ApplicationRecord
  PHOTO_PATH = './public/photos'
  def self.take_photo
    `gphoto2 --capture-image-and-download --keep --set-config /main/imgsettings/imageformat=0 --filename=#{PHOTO_PATH}/#{next_id}.jpg`
    create
  end

  def as_json(*args)
    {
      id: id,
      url: "/photos/#{id}.jpg"
    }
  end

  def self.next_id
    (Photo.maximum(:id) || 0) + 1
  end
end
