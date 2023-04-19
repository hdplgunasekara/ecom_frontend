const validateForm = (formData) => {

    if (formData.sku === "") {
      return "SKU is required";
    }
    if (formData.price === "") {
      return "Price is required";
    } 
    if (isNaN(formData.price) || Number(formData.price) <= 0) {
      return "Price should be a positive number";
    }
    };

export default validateForm;