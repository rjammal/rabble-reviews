# == Schema Information
#
# Table name: reviews
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  game_id    :integer          not null
#  rating     :integer          not null
#  review     :text             not null
#  created_at :datetime
#  updated_at :datetime
#

class Review < ActiveRecord::Base

end
