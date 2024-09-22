const Loader = (props) => {
  return (
    <div className="wrapper-prediction-loadder" {...props}>
      <div className="spinner"></div>
      <p>{props.children}</p>
    </div>
  );
};

export default Loader;
