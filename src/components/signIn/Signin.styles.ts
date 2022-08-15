import styled from 'styled-components';
import { backgroundColor, backgroundForm, color, font } from 'constants/styles';

export const Div = styled.div`
margin-left: 400px;
width: 500px;`

export const Div2 = styled.div`
display: flex;
text-align: center;
justify-content: space-around;
margin-top: 5px;
margin-left: 30px;
width: 350px;`

export const H1 = styled.h1`
text-align: center;`

export const H2 = styled.h2`
text-align: center;`

export const P = styled.p`
font-size: ${font.fontSize};
font-weight: bold;
margin-top: 2px;
margin-left: 70px`

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
margin-top: 20px;`

export const LinkStyle = styled.div`
margin-top: 5px;
margin-left: 100px;`

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