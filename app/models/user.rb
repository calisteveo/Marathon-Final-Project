
class User < ActiveRecord::Base


  has_many :locations
  has_many :journeys

  has_secure_password

  before_save { |user| user.username = username.downcase }
  before_save :create_remember_token

  validates :username, presence: true, length: { maximum: 50 }
  validates :password, presence: true, length: { minimum: 5 }
  validates :password_confirmation, presence: true

  private

  def create_remember_token
    self.remember_token = SecureRandom.urlsafe_base64
  end
  
end
