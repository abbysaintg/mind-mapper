class CreateEdges < ActiveRecord::Migration[7.0]
  def change
    create_table :edges do |t|
      t.string :source
      t.string :target
      t.references :map, null: false, foreign_key: true

      t.timestamps
    end
  end
end
