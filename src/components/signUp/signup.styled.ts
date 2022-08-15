import image from 'image/google.jpg';
import styled from 'styled-components';
import { backgroundColor, color, font } from 'constants/styles';

export const Div = styled.div`
border: solid 1px ${backgroundColor.border};
margin-left: 400px;
width: 400px`;

export const Button = styled.button`
text-align: right;
background: ${backgroundColor.button};
background-image: url(${image});
background-repeat: no-repeat;
background-size: 40px;
border: 2px ${backgroundColor.button};
border-radius: 6px;
color: ${color.buttonText};
margin-left: 40px;
padding: 8px;
padding-right: 20px;
height: 40px;
width: 200px;`; 

export const P = styled.p`
color: ${color.paragraphColor2};
font-size: ${font.fontSizeP};
text-align: center;
margin-top: 5px;
margin-bottom: 3px`

export const Register = styled.button`
background: ${backgroundColor.button};
border: none;
border-radius: 6px;
color: ${color.buttonText};
font-size: ${font.fontSizeB};
height: 40px;
margin-left: 50px;
margin-top: 20px;
margin-bottom: 10px;
width: 200px;`;

export const Form = styled.form`
align-content: center;
display: flex;
flex-flow: column wrap;`

export const ControlStyle = styled.label`
color:  ${color.paragraphColor2};
display: flex;
flex-flow: column wrap;
margin-top: 10px;`

export const Input = styled.input`
border-radius: 6px;
border: solid 1px ${backgroundColor.border};
height: 30px;
width: 300px;`