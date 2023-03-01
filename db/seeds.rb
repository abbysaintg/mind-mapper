puts "destroying seeds"
Line.destroy_all
Node.destroy_all
Map.destroy_all
User.destroy_all

puts "creating seeds"
# create users
user1 = User.create(name: "John", email: "john@example.com", password: "password")
user2 = User.create(name: "Jane", email: "jane@example.com", password: "password")
user3 = User.create(name: "Bob", email: "bob@example.com", password: "password")

# Create maps for user1
map11 = user1.maps.create(title: "Map 1-1")
map12 = user1.maps.create(title: "Map 1-2")
map13 = user1.maps.create(title: "Map 1-3")

# Create nodes and lines for map11
node111 = map11.nodes.create(label: "Node 1-1-1", x: 100, y: 100)
node112 = map11.nodes.create(label: "Node 1-1-2", x: 200, y: 200)
node113 = map11.nodes.create(label: "Node 1-1-3", x: 300, y: 300)

map11.lines.create(node_1: node111, node_2: node112)
map11.lines.create(node_1: node111, node_2: node113)
map11.lines.create(node_1: node112, node_2: node113)

# Create nodes and lines for map12
node121 = map12.nodes.create(label: "Node 1-2-1", x: 150, y: 150)
node122 = map12.nodes.create(label: "Node 1-2-2", x: 250, y: 250)

map12.lines.create(node_1: node121, node_2: node122)

# Create nodes and lines for map13
node131 = map13.nodes.create(label: "Node 1-3-1", x: 50, y: 50)
node132 = map13.nodes.create(label: "Node 1-3-2", x: 350, y: 350)

map13.lines.create(node_1: node131, node_2: node132)

# Create maps for user2
map21 = user2.maps.create(title: "Map 2-1")
map22 = user2.maps.create(title: "Map 2-2")
map23 = user2.maps.create(title: "Map 2-3")

# Create nodes and lines for map21
node211 = map21.nodes.create(label: "Node 2-1-1", x: 100, y: 100)
node212 = map21.nodes.create(label: "Node 2-1-2", x: 200, y: 200)

map21.lines.create(node_1: node211, node_2: node212)

# Create nodes and lines for map22
node221 = map22.nodes.create(label: "Node 2-2-1", x: 150, y: 150)
node222 = map22.nodes.create(label: "Node 2-2-2", x: 250, y: 250)
node223 = map22.nodes.create(label: "Node 2-2-3", x: 350, y: 350)

map22.lines.create(node_1: node221, node_2: node222)
map22.lines.create(node_1: node221, node_2: node223)
map22.lines.create(node_1: node222, node_2: node223)

# Create nodes and lines for map23
node231 = map23.nodes.create(label: "Node 2-3-1", x: 50, y: 50)
node232 = map23.nodes.create(label: "Node 2-3-2", x: 150, y: 150)
node233 = map23.nodes.create(label: "Node 2-3-3", x: 250, y: 250)

map23.lines.create(node_1: node231, node_2: node232)
map23.lines.create(node_1: node232, node_2: node233)
map23.lines.create(node_1: node233, node_2: node231)

# Create maps for user3
map31 = user3.maps.create(title: "Map 3-1")
map32 = user3.maps.create(title: "Map 3-2")
map33 = user3.maps.create(title: "Map 3-3")

# Create nodes and lines for map31
node311 = map31.nodes.create(label: "Node 3-1-1", x: 100, y: 100)
node312 = map31.nodes.create(label: "Node 3-1-2", x: 200, y: 200)
node313 = map31.nodes.create(label: "Node 3-1-3", x: 300, y: 300)
node314 = map31.nodes.create(label: "Node 3-1-4", x: 400, y: 400)

map31.lines.create(node_1: node311, node_2: node312)
map31.lines.create(node_1: node311, node_2: node313)
map31.lines.create(node_1: node312, node_2: node314)

# Create nodes and lines for map32
node321 = map32.nodes.create(label: "Node 3-2-1", x: 150, y: 150)
node322 = map32.nodes.create(label: "Node 3-2-2", x: 250, y: 250)
node323 = map32.nodes.create(label: "Node 3-2-3", x: 350, y: 350)

map32.lines.create(node_1: node321, node_2: node322)
map32.lines.create(node_1: node322, node_2: node323)
map32.lines.create(node_1: node323, node_2: node321)

# Create nodes and lines for map33
node331 = map33.nodes.create(label: "Node 3-3-1", x: 50, y: 50)
node332 = map33.nodes.create(label: "Node 3-3-2", x: 150, y: 150)
node333 = map33.nodes.create(label: "Node 3-3-3", x: 250, y: 250)
node334 = map33.nodes.create(label: "Node 3-3-4", x: 350, y: 350)

map33.lines.create(node_1: node331, node_2: node332)
map33.lines.create(node_1: node332, node_2: node333)
map33.lines.create(node_1: node333, node_2: node334)
map33.lines.create(node_1: node334, node_2: node331)

puts "seeding finished!"
