Rails.application.routes.draw do
  scope '/api' do
    resources :tasks
    resources :tags

    get 'tags/:id/tasks', to: 'tags#show_tasks'
  end
end
