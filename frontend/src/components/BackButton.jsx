import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back" }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="text-sm text-indigo-600 hover:underline mb-4 flex items-center cursor-pointer"
    >
      ← {label}
    </button>
  );
};

export default BackButton;
