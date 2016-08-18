require "kemal"

messages = [] of JSON::Any
sockets  = [] of HTTP::WebSocket

public_folder "src/assets"

get "/" do
  File.read("src/assets/index.html")
end

ws "/messages" do |socket|

  sockets.push socket
  socket.send messages.to_json

  socket.on_message do |message|
    puts "recibiendo mensaje: #{message}"
    messages.push JSON.parse(message)

    sockets.each do |_socket|
      _socket.send messages.to_json
    end
  end

  socket.on_close do |_|
    puts "cerrando conexión con #{socket}"
    sockets.delete socket
  end
end

Kemal.run
