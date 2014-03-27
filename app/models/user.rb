# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)
#  password        :string(255)
#  password_conf   :string(255)
#  remember_token  :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#  password_digest :string(255)
#

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
