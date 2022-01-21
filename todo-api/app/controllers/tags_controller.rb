class TagsController < ApplicationController
    def index
        tags = Tag.order("created_at DESC")
        render :json => tags.to_json(:include => [:tasks])
    end

    def create
        tag = Tag.create(tag_params)
    end 

    def destroy
        tag = Tag.find(params[:id])
        tag.destroy
        head :no_content, status: :ok
    end

    private

    def tag_params
      params.require(:tag).permit(:name)
    end
end
