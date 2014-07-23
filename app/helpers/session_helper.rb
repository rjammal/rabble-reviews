module SessionHelper

  def log_in!(user)
    user.reset_session_token!
    session["session_token"] = user.session_token
  end

  def log_out!
    session["session_token"] = nil
  end

  def current_user
    User.find_by_session_token(session["session_token"])
  end

  def logged_in?
    !!current_user
  end

end