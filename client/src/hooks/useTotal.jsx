import useTaxRate from "./useTaxRate";
import useSubtotal from "./useSubtotal";
import useShipping from "./useShipping";

import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";

const useTotal = () => {
  const { currentUser } = useAuth();
  const subtotal = useSubtotal(currentUser.uid, db);
  const taxRate = useTaxRate();
  const shipping = useShipping();
  const total = subtotal + (subtotal * taxRate) + shipping;

  return total;
};

export default useTotal;
