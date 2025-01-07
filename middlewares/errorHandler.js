const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);

  res.json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: err.stack,
  });
};

export default errorHandler;
