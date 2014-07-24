class RenameTypeInGames < ActiveRecord::Migration
  def change
    change_table :games do |t| 
      t.rename :type, :game_type
    end
  end
end
