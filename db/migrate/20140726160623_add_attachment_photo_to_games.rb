class AddAttachmentPhotoToGames < ActiveRecord::Migration
  def self.up
    change_table :games do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :games, :photo
  end
end
