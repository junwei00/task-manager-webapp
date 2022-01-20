Rails.application.routes.draw do
  scope '/api' do
    resources :tasks
    resources :tags
  end
end
