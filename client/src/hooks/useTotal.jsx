import useTaxRate from "./useTaxRate";
import useSubtotal from "./useSubtotal";
import useShipping from "./useShipping";


const useTotal = (userId, db) => {
  
  const subtotal = useSubtotal(userId, db);
  const taxRate = useTaxRate();
  const shipping = useShipping();
  const total = subtotal + (subtotal * taxRate) + shipping;

  return total;
};

export default useTotal;
