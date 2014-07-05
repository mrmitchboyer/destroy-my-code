require './config/environment'
use Rack::Static, :urls => ['/stylesheets', '/images', '/prism', '/js'], :root => 'public'

run ApplicationController