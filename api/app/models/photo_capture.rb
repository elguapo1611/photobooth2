class PhotoCapture

  def initialize(path='./public/photos')
    @path = path
  end

  def take_photo
    `gphoto2 --capture-image-and-download --keep --set-config /main/imgsettings/imageformat=0 --filename=#{@path}/1.jpg`
  end

end
