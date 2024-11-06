export default function Selectbox({
    className = "",
    options = [],
    currentValue = "",
    ...props
}) {
    return (
        <select
            {...props}
            defaultValue={currentValue}
            className={
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full" +
                className
            }
        >
            {/* Menjalankan perintah selectbox di Create.jsx */}
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
