/* NEXORA Form Validation */
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim());
export const isPhone = (v) => /^[0-9+\-\s()]{7,15}$/.test((v || "").trim());
export const isPostal = (v) => /^[A-Za-z0-9\-\s]{3,10}$/.test((v || "").trim());
export const isCardNumber = (v) => /^[0-9]{13,19}$/.test((v || "").replace(/\s/g, ""));
export const isCVV = (v) => /^[0-9]{3,4}$/.test((v || "").trim());

export const isExpiry = (v) => {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test((v || "").trim())) return false;
  const [mm, yy] = v.split("/").map(Number);
  const now = new Date();
  const exp = new Date(2000 + yy, mm, 0);
  return exp >= now;
};

export const isUPI = (v) => /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test((v || "").trim());

export const validateCheckout = (form, paymentMethod) => {
  const errors = {};

  if (!form.fullName.trim()) errors.fullName = "Full name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!isEmail(form.email)) errors.email = "Invalid email address";
  if (!form.phone.trim()) errors.phone = "Phone is required";
  else if (!isPhone(form.phone)) errors.phone = "Invalid phone number";
  if (!form.address.trim()) errors.address = "Address is required";
  if (!form.city.trim()) errors.city = "City is required";
  if (!form.state.trim()) errors.state = "State is required";
  if (!form.postalCode.trim()) errors.postalCode = "Postal code is required";
  else if (!isPostal(form.postalCode)) errors.postalCode = "Invalid postal code";
  if (!form.country.trim()) errors.country = "Country is required";

  if (paymentMethod === "card") {
    if (!form.cardName.trim()) errors.cardName = "Name on card is required";
    if (!form.cardNumber.trim()) errors.cardNumber = "Card number is required";
    else if (!isCardNumber(form.cardNumber)) errors.cardNumber = "Card number must be 13-19 digits";
    if (!form.expiry.trim()) errors.expiry = "Expiry is required";
    else if (!isExpiry(form.expiry)) errors.expiry = "Expiry must be MM/YY and in the future";
    if (!form.cvv.trim()) errors.cvv = "CVV is required";
    else if (!isCVV(form.cvv)) errors.cvv = "CVV must be 3-4 digits";
  }

  if (paymentMethod === "upi") {
    if (!form.upiId.trim()) errors.upiId = "UPI ID is required";
    else if (!isUPI(form.upiId)) errors.upiId = "Invalid UPI ID (e.g. name@bank)";
  }

  return errors;
};
