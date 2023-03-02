class CreateLines < ActiveRecord::Migration[7.0]
  def change
    create_table :lines do |t|
      t.integer :map_id
      t.integer :parent_id
      t.integer :child_id

      t.timestamps
    end
  end
end
