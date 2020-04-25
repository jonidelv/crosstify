/** @jsx jsx */
import { css, jsx, Global, SerializedStyles } from '@emotion/core'

const globalStyles: SerializedStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:200,400,500');

  html,
  body,
  div,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  cite,
  code,
  em,
  img,
  strong,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  footer,
  header,
  menu,
  nav,
  output,
  section,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  html,
  body {
    line-height: 1;
    height: 100%;
    width: 100%;
    font-family: 'Montserrat', sans-serif;
    height: 100vh;
    overflow: hidden;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

const GlobalStyles: React.FC = () => {
  return <Global styles={globalStyles} />
}

export default GlobalStyles
