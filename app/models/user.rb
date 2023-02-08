# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  validates :username, :email, :session_token, presence: true, uniqueness: true
  validates :username, length: {in: 3..30}, format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
  validates :email, length: {in: 3..255}, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: {in: 6..255}, allow_nil: true

  has_secure_password

  has_many :reservations,
    foreign_key: :student_id,
    class_name: :Reservation,
    dependent: :destroy

  has_many :reviews,
    foreign_key: :reviewer_id,
    class_name: :Review,
    dependent: :destroy

  has_many :lesson_dates,
    through: :reservations,
    source: :lesson_date
  
  attr_accessor :reservation_datetimes

  before_validation :ensure_session_token
  # SPIRE

  
  def self.find_by_credentials(credential, password)
    if credential.match(URI::MailTo::EMAIL_REGEXP)
      user = User.find_by(email: credential)
    else  
      user = User.find_by(username: credential)
    end

    if user && user.authenticate(password)
      return user 
    else 
      return nil 
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    pass = BCrypt::Password.new(password_digest)
    pass.is_password?(password)

  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    # self.save!
    self.session_token
  end 

  private
  def generate_unique_session_token
    token = SecureRandom::urlsafe_base64 
    while User.exists?(session_token: token)
      token = SecureRandom::urlsafe_base64 
    end
    return token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
