import React from "react";
import AddressForm from "../AddressForm";

const Address = ({
  userAddress,
  country,
  setCountry,
  city,
  setCity,
  street,
  setStreet,
}) => {
  return (
    <div>
      {userAddress ? (
        // Existing Address Display
        <AddressForm
          country={userAddress?.country}
          setCountry={setCountry}
          city={userAddress?.city}
          setCity={setCity}
          street={userAddress?.street}
          setStreet={setStreet}
          readonly={!!userAddress} // This will pass true if userAddress is not null
        />
      ) : (
        // Address Form for Adding
        <AddressForm
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          street={street}
          setStreet={setStreet}
          readonly={false}
        />
      )}
    </div>
  );
};

export default Address;
