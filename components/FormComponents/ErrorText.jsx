export default function ErrorText({ error, margin = false }) {
  return margin == true ? (
    <p className="text-xs p-0 ml-3 text-red-600">{error}</p>
  ) : (
    <p className="text-xs p-0 m-0 text-red-600">{error}</p>
  );
}
