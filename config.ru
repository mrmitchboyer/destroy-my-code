require './config/environment'
use Rack::Static, :urls => ['/stylesheets', '/images', '/prism'], :root => 'public'

run ApplicationController