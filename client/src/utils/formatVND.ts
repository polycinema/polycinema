export const formatCurrency = (amount:string|number|undefined) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};