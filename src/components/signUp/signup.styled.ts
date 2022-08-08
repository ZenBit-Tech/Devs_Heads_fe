import image from '../../image/google.jpg';
import styled from 'styled-components';

export const Div = styled.div`
border: solid 1px rgb(153, 152, 152);
margin-left: 400px;
width: 400px`;

export const Button = styled.button`
text-align: right;
background: rgb(50, 90, 199);
background-image: url(${image});
background-repeat: no-repeat;
background-size: 40px;
border: 2px rgb(50, 90, 199);
border-radius: 6px;
color: white;
margin-left: 40px;
padding: 8px;
padding-right: 20px;
height: 40px;
width: 200px;`; 

export const P = styled.p`
color:  rgb(116, 113, 113);
font-size: 12px;
text-align: center;
margin-top: 5px;
margin-bottom: 3px`

export const Register = styled.button`
background: rgb(50, 90, 199);
border: none;
border-radius: 6px;
color: white;
font-size: 20px;
height: 40px;
margin-left: 50px;
margin-top: 20px;
margin-bottom: 10px;
width: 200px;`;

export const Form = styled.form`
align-content: center;
display: flex;
flex-flow: column wrap;`

export const Label = styled.label`
color:  rgb(116, 113, 113);
display: flex;
flex-flow: column wrap;
margin-top: 10px;`

export const Input = styled.input`
border-radius: 6px;
border: solid 1px rgb(153, 152, 152);
height: 30px;
width: 300px;`