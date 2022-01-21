class TagsController < ApplicationController
    def index
        tags = Tag.order("created_at DESC")
        render :json => tags.to_json(:include => [:tasks])
    end

    def show
        tag = Tag.find(params[:id])
        render :json => tag.to_json(:include => [:tasks])
    end

    def create
        tag = Tag.create(tag_params)
    end 

    def destroy
        tag = Tag.find(params[:id])
        tag.destroy
        head :no_content, status: :ok
    end

    def update
        tag = Tag.find(params[:id])

        if (params[:do].eql? "add")
            tag.tasks << Task.find(params[:task])
            render :json => tag.to_json(:include => [:tasks])
        elsif (params[:do].eql? "delete")
            tag.tasks.delete(Task.find(params[:task]))
            render :json => tag.to_json(:include => [:tasks])
        else 
            render :json => {"unknown":params[:do]}
        end
    end

    private

    def tag_params
      params.require(:tag).permit(:name)
    end
end
