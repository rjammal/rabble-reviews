class AddAttachmentImageToGames < ActiveRecord::Migration
  def self.up
    change_table :games do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :games, :image
  end
end
