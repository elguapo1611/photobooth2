class PhotosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @photos = Photo.order("id desc").paginate(:page => params[:page], :per_page => 15)
    render json: @photos.to_json
  end

  def create
    @photo = Photo.take_photo
    @photos = Photo.order("id desc").paginate(:page => params[:page], :per_page => 15)
    render json: @photos.to_json
  end
end
