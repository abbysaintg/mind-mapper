class CreateNodes < ActiveRecord::Migration[7.0]
  def change
    create_table :nodes do |t|
      t.integer :map_id
      t.string :label
      t.string :color
      t.float :x
      t.float :y

      t.timestamps
    end
  end
end
