export default function InputField({ label, value, setValue, type }) {
  return (
    <div className="flex flex-wrap -mx-3 mt-5">
      <div className="w-full px-3">
        <label
          className="block text-gray-700 text-s font-bold mb-2"
          htmlFor="grid-date"
        >
          {label}
        </label>
        <input
          value={value}
          type={type}
          onChange={(e) => setValue(e.target.value)}
          className="appearance-none block w-72 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          disabled={false}
        />
      </div>
    </div>
  );
}
