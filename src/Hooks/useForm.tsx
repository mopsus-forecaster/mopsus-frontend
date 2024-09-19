import { ChangeEvent, useState } from "react";


export const useForm = <T extends object>( initState: T) => {

    const [form, setForm] = useState(initState)
    
      const handleChange = ({target}: ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = target;
    
        setForm({
          ...form,
          [name]: value
        })
      }

    return {
        form,
        handleChange
    }
}