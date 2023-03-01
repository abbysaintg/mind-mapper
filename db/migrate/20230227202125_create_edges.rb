class CreateEdges < ActiveRecord::Migration[7.0]
  def change
    create_table :edges do |t|
      t.references :source_node, null: false, foreign_key: { to_table: :nodes }
      t.references :target_node, null: false, foreign_key: { to_table: :nodes }
      t.references :map, null: false, foreign_key: true

      t.timestamps
    end
  end
end
