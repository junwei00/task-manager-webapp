Rails.application.routes.draw do
  scope '/api' do
    resources :tasks
    resources :tags
    resources :users

    get 'tags/:id/tasks', to: 'tags#show_tasks'

    get ':user_id/tasks', to: 'tasks#index_user'
    post ':user_id/tasks', to: 'tasks#create_user'
    
    get ':user_id/tags', to: 'tags#index_user'
    post ':user_id/tags', to: 'tags#create_user'
  end
end
