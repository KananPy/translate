import React from 'react'

function LanguageSelector({label, value, onChange, languages}) {
  return (
    <div>
        <label>
            {label}
            <select value={value} onChange={onChange}>
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}

            </select>
        </label>
    </div>
  )
}

export default LanguageSelector