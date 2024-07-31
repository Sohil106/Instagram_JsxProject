import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';
import { useController } from 'react-hook-form';

const CustomInput =forwardRef(({
    label,
    placeholder,
    name,
    type = "text",
    disabled = false,
    className = '',
    onKeyUp,
    value,
    onInputBlur,
    control
},ref) => {
  const{
    field: {onChange},
    fieldState : {error}
  } = useController({
    name,
    control,
    defaultValue:''
  })
  return (
      <TextField type={type}
        label={label}
        name={name}
        id={name}
        placeholder={placeholder}
        className={`${className}`}
        onChange={onChange}
        disabled={disabled} 
        variant="outlined"
        style={{width:300}}
        error={!!error} 
        helperText={error?.message}
        inputRef={ref}
        onKeyUp={onKeyUp}
        onBlur={onInputBlur}
        defaultValue={value}
        />
  )
})

export default CustomInput