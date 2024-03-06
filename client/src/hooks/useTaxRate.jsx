// Custom hook to fetch tax
const useTaxRate = (subtotal) => {
    const taxRate = 0.1; // 10% tax rate
    const taxAmount = subtotal * taxRate;
    
    return taxAmount;
};

export default useTaxRate;
