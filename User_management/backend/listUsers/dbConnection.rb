require 'mysql2'
require 'dotenv'

# Load environment variables from a specific .env file
Dotenv.load('../../.env')

def connect_to_db
  begin
    # Establish database connection using .env variables
    client = Mysql2::Client.new(
      host: ENV['DB_HOST'],
      username: ENV['DB_USER'],
      password: ENV['DB_PASSWORD'],
      database: ENV['DB_NAME'],
      port: 3306
    )
    puts "Connected to the database successfully"
    return client
  rescue Mysql2::Error => e
    # Handle connection error
    puts "Error connecting to the database: #{e.message}"
    return nil
  end
end

# Export global database connection
$db_client = connect_to_db
