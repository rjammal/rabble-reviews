# == Schema Information
#
# Table name: games
#
#  id            :integer          not null, primary key
#  name          :string(255)      not null
#  type          :string(255)      not null
#  year_released :integer
#  min_players   :integer
#  max_players   :integer
#  created_at    :datetime
#  updated_at    :datetime
#

class Game < ActiveRecord::Base

end
