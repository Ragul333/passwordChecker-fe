import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Dna } from 'react-loader-spinner';
import { createResult } from './api';



const PasswordStrengthChecker = () => {
  const mutation = useMutation(createResult);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(null);
  const [inputColor, setInputColor] = useState('');
  const [caseCondition, setCaseCondition] = useState(null);

  const isStrongPassword = (password) => {
    // Check password length
    setCaseCondition((password?.length > 6) ? 0 : 6 - password?.length);

    if (password?.length < 6 || password?.length > 20) {
      return false;
    }

    // Check for at least one lowercase letter, one uppercase letter, and one digit
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      return false;
    }

    // Check for three repeating characters in a row
    for (let i = 0; i < password.length - 2; i++) {
      if (password[i] === password[i + 1] && password[i + 1] === password[i + 2]) {
        return false;
      }
    }

    // Password meets all the criteria for a strong password
    return true;
  };

  const handleChange = (event) => {
    setPassword(event.target.value);
    const strong = isStrongPassword(event.target.value);
    setStrength(strong ? 'Strong' : 'Weak');
    console.log('password : ', event.target.value?.length)
    setInputColor(strong ? 'green' : (!strong && event.target.value?.length > 0) ? 'red' : 'black')
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const strong = isStrongPassword(password);
    try {
      // Call the mutation function to post data to the server
      await mutation.mutateAsync({ password });
      // If the post is successful, you can perform any additional actions here
      console.log('Data posted successfully!');
    } catch (error) {
      // Handle any errors that occur during the mutation
      console.error('Failed to post data:', error.message);
    }
    setStrength(null);
    setPassword('');
  };

  return (
    <>

    <div className='container'>
      <div class="password-input">{
        inputColor === 'green' ? <i class="lock-icon fas fa-lock" style={{ color: "#60ff00" }}></i> : <i class="lock-icon fas fa-unlock" style={{ color: `#ff5100` }}></i>
      }

        <input placeholder="Password" type="password" value={password} onChange={handleChange} />
      </div>
      {mutation.isLoading ? (
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      ) : (
        <button className={`custom-button ${strength}`} onClick={strength === 'Strong' ? handleSubmit : ()=>{}} disabled={(strength === 'Weak' || mutation.isLoading) ? true : false}>Save Password</button>
      )}

      <p style={{ color: `${inputColor}`, fontWeight: 600}}>
        {caseCondition}
      </p>

    </div>
    </>
  );
};

export default PasswordStrengthChecker;
