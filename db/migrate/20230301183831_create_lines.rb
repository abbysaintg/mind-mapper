class CreateLines < ActiveRecord::Migration[7.0]
  def change
    create_table :lines do |t|
      t.integer :map_id
      t.integer :node_id_1
      t.integer :node_id_2

      t.timestamps
    end
  end
end
