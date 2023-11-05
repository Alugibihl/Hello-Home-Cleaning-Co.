export default function InputField({
  label,
  value,
  setValue,
  type,
  placeholder,
  name,
}) {
  return (
    <div className="flex flex-wrap">
      <div className="px-3">
        <label
          className="block text-gray-700 text-s font-bold mb-2"
          htmlFor="grid-date"
        >
          {label}
        </label>
        <input
          placeholder={placeholder || ""}
          value={value}
          type={type}
          name={name}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          disabled={false}
        />
      </div>
    </div>
  );
}
