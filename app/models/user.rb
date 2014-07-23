class User < ActiveRecord::Base

  attr_reader :password
  validates :name, :session_token, :password_digest, presence: true
  validates :name, :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_blank: true}

  before_validation :ensure_session_token

  def password=(val)
    @password = val
    self.password_digest = BCrypt::Password.create(val)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token()
  end

  def reset_session_token! 
    self.session_token = User.generate_session_token
    save!
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_name(username)
    return nil unless user

    bcrypt = BCrypt::Password.new(user.password_digest)
    if bcrypt.is_password?(password)
      user
    else
      nil
    end
  end

end