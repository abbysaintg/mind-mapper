puts "destroying seeds"
Edge.destroy_all
Node.destroy_all
Collaboration.destroy_all
User.destroy_all
Map.destroy_all

puts "creating seeds"
# Create a first map
map1 = Map.create(title: "Map 1")

# Create some nodes
node1 = Node.create(label: "Node 1", x: 100, y: 100, color: "red", map: map1)
node2 = Node.create(label: "Node 2", x: 200, y: 200, color: "blue", map: map1)
node3 = Node.create(label: "Node 3", x: 300, y: 300, color: "green", map: map1)

# Create some edges
edge1 = Edge.create(source_node: node1, target_node: node2, map: map1)
edge2 = Edge.create(source_node: node1, target_node: node3, map: map1)
edge3 = Edge.create(source_node: node2, target_node: node3, map: map1)

# Create some users
user1 = User.create(username: "user1", password: "password1", email: "user1@example.com")
user2 = User.create(username: "user2", password: "password2", email: "user2@example.com")

# Associate the first map with the first user
Collaboration.create(user: user1, map: map1)

# Associate the second map with both users
map2 = Map.create(title: "Map 2")
Collaboration.create(user: user1, map: map2)
Collaboration.create(user: user2, map: map2)

# Create some nodes for the second map
node4 = Node.create(label: "Node 4", x: 400, y: 400, color: "purple", map: map2)
node5 = Node.create(label: "Node 5", x: 500, y: 500, color: "orange", map: map2)
node6 = Node.create(label: "Node 6", x: 600, y: 600, color: "yellow", map: map2)

# Create some edges for the second map
edge4 = Edge.create(source_node: node4, target_node: node5, map: map2)
edge5 = Edge.create(source_node: node4, target_node: node6, map: map2)
edge6 = Edge.create(source_node: node5, target_node: node6, map: map2)

puts "seeding finished!"
