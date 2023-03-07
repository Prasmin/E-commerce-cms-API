const isAuth = (req, res, next) => {
  try {
    const authorized = false




    authorized ? 
    next()
    :
    res.status(403).json({
      status: "error",
      message = " "
    })
  } catch (error) {
    
  }
}