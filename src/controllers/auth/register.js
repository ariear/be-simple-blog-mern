export const registerController = (req, res) => {
    const data = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    }
    res.json({
        message: 'Registered',
        data: data
    })
}