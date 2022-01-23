class TasksController < ApplicationController
  def index
    tasks = Task.order("created_at DESC")
    render :json => tasks.to_json(:include => [:tags])
  end

  def index_user
    user = User.find(params[:user_id])
    tasks = user.tasks.order("created_at DESC")
    render :json => tasks.to_json(:include => [:tags])
  end

  def show
    task = Task.find(params[:id])
    render :json => task.to_json(:include => [:tags])
  end

  def create
    task = Task.create(task_params)
    render :json => task.to_json(:include => [:tags])
  end

  def create_user
    user = User.find(params[:user_id])
    task = Task.create(task_params)
    user.tasks << task
    render :json => task.to_json(:include => [:tags])
  end

  def update
    task = Task.find(params[:id])
    task.update(task_params)
    render :json => task.to_json(:include => [:tags])
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    head :no_content, status: :ok
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :deadline, :status)
  end
end