class ApplicationController < Sinatra::Base
  set :views, Proc.new { File.join(root, "../views/") }
  configure(:development) { set :session_secret, "something" }
  enable :sessions

  get '/' do
    @begin_code = "ENTER YOUR CODE HERE >"
    erb :index
  end

  post '/view-code' do
    if params[:code].strip == "" || params[:code].strip == "ENTER YOUR CODE HERE >"
      redirect '/'
    else
      session['code'] = params[:code]
      redirect '/blow-it-up'
    end
  end

  get '/blow-it-up' do
    @code = Code.new(session['code'])
    erb :explosion
  end

end