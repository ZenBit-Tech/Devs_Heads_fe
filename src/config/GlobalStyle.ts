import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
}
body {
height: 100%;
overflow-x: hidden;
}
html {
  height: 100%;
}
img,
picture,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}
input,
button,
textarea,
select {
  font: inherit;
}
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
button {
    border: none;
  background-color: transparent;   
  cursor: pointer;
}
`;

export default GlobalStyle;
