// AddressForm.js
import React from 'react';

const AddressForm = ({ country, setCountry, city, setCity, street, setStreet, countries, readonly }) => {
  const handleChange = (setter) => readonly ? () => {} : setter;

  return (
    <div>
      {/* Country */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Country</span>
        </label>
        <select
          className="select select-bordered select-primary w-full"
          value={country}
          onChange={(e) => handleChange(setCountry)(e.target.value)}
          disabled={readonly}
        >
          <option disabled value="">Select a country</option>
          {!readonly && countries.map((c, index) => (
            <option key={index} value={c.name}>{c.name}</option>
          ))}
          {readonly && <option value={country}>{country}</option>}
        </select>
      </div>

      {/* City */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">City</span>
        </label>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => handleChange(setCity)(e.target.value)}
          className="input input-bordered input-primary"
          readOnly={readonly}
        />
      </div>

      {/* Street */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Street</span>
        </label>
        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => handleChange(setStreet)(e.target.value)}
          className="input input-bordered input-primary"
          readOnly={readonly}
        />
      </div>
    </div>
  );
};

export default AddressForm;
