const Toast = ({ message, show }) => {
  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow">
      {message}
    </div>
  );
};

export default Toast;
