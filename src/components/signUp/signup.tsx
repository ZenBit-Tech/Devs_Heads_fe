import React, { FC } from 'react';

const signUp: FC = () => {
  return (
    <>
      <form>
        <label>
          Email
          <input type="email" />
        </label>
        <label>
          Create a password
          <input type="password" />
        </label>
        <label>
          Confirm password
          <input type="password" />
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default signUp;