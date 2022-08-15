import styled from 'styled-components';
import { backgroundColor, buttonColorHover, Color, FontSize } from '../style/App.styled';

export const Div1 = styled.div`
align-content: center;
display: flex;
flex-flow: column wrap;
`
export const H1 = styled.h1`
text-align: center;`

export const Div2 = styled.div`
display: flex;
flex-flow: column wrap;
border: solid 1px ${backgroundColor.borderColor};
justify-content: space-around;
width: 480px`

export const Div3 = styled.div`
display: flex;
text-align: center;
justify-content: space-around;
margin-bottom: 50px;`

export const P = styled.p`
text-align: center;
font-size: ${FontSize.Text};
color: ${Color.Text};
margin-bottom: 30px;`

export const Button = styled.button`
&:hover {
  background: ${buttonColorHover};
  color: ${Color.Button};
}
border: solid 1px ${backgroundColor.borderColor};
border-radius: 6px;
font-size: ${FontSize.Button};
padding: 30px;
width: 235px;`

export const Button2 = styled.button`
background: ${backgroundColor.Button2};
border: none;
border-radius: 6px;
color: ${Color.Button};
font-size: ${FontSize.Button2};
height: 40px;
margin-left: 30px;
margin-top: 20px;
margin-bottom: 20px;
width: 420px;`

