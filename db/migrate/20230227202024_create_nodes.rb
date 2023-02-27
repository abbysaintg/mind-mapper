class CreateNodes < ActiveRecord::Migration[7.0]
  def change
    create_table :nodes do |t|
      t.string :label
      t.float :x
      t.float :y
      t.string :color
      t.bigint :parent_id
      t.references :map, null: false, foreign_key: true

      t.timestamps
    end
  end
end
