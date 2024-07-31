import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getProfilePicture, postProfilePicture } from '../../redux/slices/ProfileSlice';
import { decodeToken } from '../../utils/AuthService';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  const disPatch = useDispatch();
  const { register, handleSubmit, setValue} = useForm();
  const userData = decodeToken();
  const [errorText, setErrorText] = React.useState(null);

  const validateFile = (file) => {
    if (!file) return "File is required.";
    if (!file.type.startsWith('image/')) return "Only image files like jpg,png,JPEG are allowed.";
    if (file.size > 1048576) return "File size should be less than 1 MB.";
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const isValid = validateFile(file);
    if (isValid === true) {
      setValue('photo', file);  // Set the file object into react-hook-form
      handleSubmit(onSubmit)();
      setErrorText(null);
    }
    else{
      setErrorText(isValid); 
    }
  };


  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('profilePicture',data.photo)
    const res = disPatch(postProfilePicture(formData));
  };
  return (
    <form>
      <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
    >
      Change Photo
      <VisuallyHiddenInput type="file"  {...register('photo')} onChange={handleFileChange} />
     </Button>
     {errorText && <p style={{ color: 'red' }}>{errorText}</p>}
    </form>
  );
}
