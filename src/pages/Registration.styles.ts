import styled from 'styled-components';
import { 
  BLUE,
  LIGHT_GREY,
  GREY,
  DARK_GREY,
  GREEN,
  WHITE,
  FONT_MEDIUM,
  FONT_LARGE
} from '../constants/styles';

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
border: solid 1px ${LIGHT_GREY};
justify-content: space-around;
width: 480px`

export const Div3 = styled.div`
display: flex;
text-align: center;
justify-content: space-around;
margin-bottom: 50px;`

export const P = styled.p`
text-align: center;
font-size: ${FONT_MEDIUM};
color: ${DARK_GREY};
margin-bottom: 30px;`

export const Button = styled.button`
&:hover {
  background: ${GREEN};
  color: ${WHITE};
};
border: solid 1px ${GREY};
border-radius: 6px;
font-size: ${FONT_MEDIUM};
padding: 30px;
width: 235px;`

export const Button2 = styled.button`
background: ${BLUE};
border: none;
border-radius: 6px;
color: ${WHITE};
font-size: ${FONT_LARGE};
height: 40px;
margin-left: 30px;
margin-top: 20px;
margin-bottom: 20px;
width: 420px;`

