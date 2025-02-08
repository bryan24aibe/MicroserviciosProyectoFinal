require 'sinatra'
require 'sinatra/cross_origin'
require 'json'
require_relative 'dbConnection'

configure do
  enable :cross_origin
end

set :bind, '0.0.0.0'
set :port, 4567

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

get '/users' do
  content_type :json

  if $db_client.nil?
    status 500
    return { status: 'error', message: 'Database conection not available' }.to_json
  end

  begin
    results = $db_client.query('SELECT id, username, email FROM users')
    users = results.map(&:to_h)
    { data: users }.to_json
  rescue Mysql2::Error => e
    status 500
    { status: 'error', message: "Database error: #{e.message}" }.to_json
  end
end
