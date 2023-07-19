import axios from 'axios'
import {toast} from 'react-toastify'
 const Axios= axios.create({
        baseURL:process.env.REACT_APP_BACKEND_URL,
        timeout:30000,
        withCredentials:true
})
const getImage=(url)=>{
        return process.env.REACT_APP_BACKEND_URL+"/s3/getImage?url="+url
}
function formatIndianRupee(value) {
        // Convert the value to a string and remove any non-digit characters
        const stringValue = String(value).replace(/\D/g, '');
      
        // Split the string into two parts: integer and decimal
        const [integerPart, decimalPart] = stringValue.split('.');
      
        // Add commas to the integer part
        const formattedInteger = integerPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      
        // Combine the formatted integer part and the decimal part (if present)
        const formattedValue = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
      
        // Add the Indian Rupee symbol ₹
        return `₹${formattedValue}`;
      }
      
export {getImage,formatIndianRupee}
export default Axios;