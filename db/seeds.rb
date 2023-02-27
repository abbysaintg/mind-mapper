puts "destroying seeds"
Edge.destroy_all
Node.destroy_all
Collaboration.destroy_all
User.destroy_all
Map.destroy_all

puts "creating users"
user1 = User.create(username: 'user1', password_digest: 'password', email: 'user1@example.com')
user2 = User.create(username: 'user2', password_digest: 'password', email: 'user2@example.com')
user3 = User.create(username: 'user3', password_digest: 'password', email: 'user3@example.com')

puts "creating maps"
map1 = Map.create(title: 'Map 1')
map2 = Map.create(title: 'Map 2')

puts "creating collaborations"
Collaboration.create(user: user1, map: map1)
Collaboration.create(user: user2, map: map1)
Collaboration.create(user: user3, map: map2)

puts "creating nodes for map #1"
root_node = Node.create(label: 'Root Node', x: 0.0, y: 0.0, color: '#000000', map: map1)
child_node1 = Node.create(label: 'Child Node 1', x: 10.0, y: 10.0, color: '#000000', parent_id: root_node, map: map1)
child_node2 = Node.create(label: 'Child Node 2', x: -10.0, y: 10.0, color: '#000000', parent_id: root_node, map: map1)

puts "creating nodes for map #2"
root_node2 = Node.create(label: 'Root Node', x: 0.0, y: 0.0, color: '#000000', map: map2)
child_node1_2 = Node.create(label: 'Child Node 1', x: 10.0, y: 10.0, color: '#000000', parent_id: root_node2, map: map2)

puts "creating edges for map #1"
Edge.create(source: root_node, target: child_node1, map: map1)
Edge.create(source: root_node, target: child_node2, map: map1)

puts "creating edges for map #2"
Edge.create(source: root_node2, target: child_node1_2, map: map2)
