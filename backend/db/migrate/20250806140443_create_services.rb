class CreateServices < ActiveRecord::Migration[8.0]
  def change
    create_table :services do |t|
      t.string :name
      t.integer :price_euros
      t.string :location
      t.references :nutritionist, null: false, foreign_key: true

      t.timestamps
    end
  end
end
