puts "destroying seeds"
Line.destroy_all
Node.destroy_all
Map.destroy_all
User.destroy_all

puts "creating seeds"
# Create users
user1 = User.create(name: "John Doe", email: "john.doe@example.com", avatar_seed: "4lf6wb1v6rc", password: "password")
user2 = User.create(name: "Jane Doe", email: "jane.doe@example.com", avatar_seed: "v96sk8tz82", password: "password")
user3 = User.create(name: "Bob Smith", email: "bob.smith@example.com", avatar_seed: "5j1bgvpm8r", password: "password")

# Create maps for each user
user1_maps = []
user2_maps = []
user3_maps = []

3.times do
  user1_maps << user1.maps.create(title: "Map for #{user1.name}")
  user2_maps << user2.maps.create(title: "Map for #{user2.name}")
  user3_maps << user3.maps.create(title: "Map for #{user3.name}")
end

# Create nodes and lines for each map
user1_maps.each do |map|
  # Create nodes
  node1 = map.nodes.create(label: "Node 1", color: "green", x: 100, y: 100)
  node2 = map.nodes.create(label: "Node 2", color: "green", x: 200, y: 100)
  node3 = map.nodes.create(label: "Node 3", color: "green", x: 150, y: 200)

  # Create lines
  map.lines.create(parent_id: node1.id, child_id: node2.id)
  map.lines.create(parent_id: node2.id, child_id: node3.id)
  map.lines.create(parent_id: node1.id, child_id: node3.id)
end

user2_maps.each do |map|
  # Create nodes
  node1 = map.nodes.create(label: "Node A", color: "purple", x: 100, y: 100)
  node2 = map.nodes.create(label: "Node B", color: "yellow", x: 200, y: 100)
  node3 = map.nodes.create(label: "Node C", color: "pink", x: 150, y: 200)

  # Create lines
  map.lines.create(parent_id: node1.id, child_id: node2.id)
  map.lines.create(parent_id: node2.id, child_id: node3.id)
  map.lines.create(parent_id: node1.id, child_id: node3.id)
end

user3_maps.each do |map|
  # Create nodes
  node1 = map.nodes.create(label: "Start", color: "pink", x: 100, y: 100)
  node2 = map.nodes.create(label: "Middle", color: "green", x: 200, y: 100)
  node3 = map.nodes.create(label: "End", color: "yellow", x: 150, y: 200)

  # Create lines
  map.lines.create(parent_id: node1.id, child_id: node2.id)
  map.lines.create(parent_id: node2.id, child_id: node3.id)
  map.lines.create(parent_id: node1.id, child_id: node3.id)
end


puts "seeding finished!"
