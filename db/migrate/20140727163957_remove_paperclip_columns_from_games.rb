class RemovePaperclipColumnsFromGames < ActiveRecord::Migration
  def up
    change_table :games do |t|
      t.remove :photo_file_name, :photo_content_type, :photo_file_size, :photo_updated_at
    end
  end

  def down
    change_table :games do |t|
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size
      t.datetime :photo_updated_at
    end
  end
end