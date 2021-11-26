exports.home = async(req,res) => {
    res.render("home")
}

exports.viewLogin = async(req,res) => {
    res.render("login")
}

exports.viewSignup = async(req,res) => {
    res.render("signup")
}