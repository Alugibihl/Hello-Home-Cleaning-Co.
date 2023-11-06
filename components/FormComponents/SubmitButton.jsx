export default function SubmitButton({ buttonText, onClick, type }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-feather-blue hover:bg-highlight-orange font-bold py-2 px-4 rounded my-4"
    >
      {buttonText}
    </button>
  );
}
