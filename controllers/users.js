exports.signup = (req, res) => {
    console.log(req.body)
    res.status(200).json(req.body)
}/*
exports.login = (req, res) => {
    res.status(200).json('login')
    .then(res.status(200).json('login'))
}*/