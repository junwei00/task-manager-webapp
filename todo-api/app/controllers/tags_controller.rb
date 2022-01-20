class TagsController < ApplicationController
    def index
        tags = Tag.order("created_at DESC")
        render :json => tags.to_json(:include => [:tasks])
    end
end
