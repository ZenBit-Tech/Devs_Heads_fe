import styled from 'styled-components';
import { backgroundColor, backgroundForm, color, font } from 'style/App.styled';


export const Div = styled.div`
margin-left: 400px;
width: 500px;`

export const ErrorP = styled.p`
color: ${color.paragraphColor}
font-size: ${font.fontSizeP}`

export const Form = styled.form`
align-content: center;
background: ${backgroundForm};
border: solid 1px ${backgroundColor.border};
display: flex;
flex-flow: column wrap;
margin-top: 20px;
margin-left: 100px;
height: 300px;
width: 300px`

export const Input = styled.input`
border-radius: 6px;
border: solid 1px ${backgroundColor.border};
height: 30px;
width: 250px;`

export const ControlStyle = styled.label`
color:  ${color.paragraphColor};
display: flex;
flex-flow: column wrap;
margin-top: 50px;`

export const Button = styled.button`
background: ${backgroundColor.button};
border: none;
border-radius: 6px;
color: ${color.buttonText};
font-size: ${font.fontSizeB};
height: 40px;
margin-left: 50px;
margin-top: 20px;
margin-bottom: 10px;
height: 50px;
width: 150px;`;